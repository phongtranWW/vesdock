import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import * as Docker from 'dockerode';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Vps, VpsStatus } from '@vpses/entities/vps.entity';
import { Job } from 'bull';

@Processor('vps')
export class VpsProcessor {
  constructor(
    @Inject('DOCKER')
    private readonly docker: Docker,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  private async findAvailablePort(): Promise<number> {
    let port = 2222;
    const containers = await this.docker.listContainers();
    const usedPorts = containers.flatMap((container) =>
      Object.values(container.Ports).map((port) => port.PublicPort),
    );

    while (usedPorts.includes(port)) {
      port++;
    }
    return port;
  }

  @Process('create')
  async createVps(job: Job<{ vpsId: string }>): Promise<{
    containerId: string;
    port: number;
  }> {
    const { vpsId } = job.data;

    const vps = await this.entityManager.findOne(Vps, {
      select: {
        vpsId: true,
        username: true,
        password: true,
        operationSystem: {
          image: true,
          tag: true,
        },
        hardwareConfig: {
          ram: true,
          cpu: true,
        },
      },
      relations: {
        operationSystem: true,
        hardwareConfig: true,
      },
      where: { vpsId },
    });

    if (!vps) {
      throw new Error('Vps not found');
    }

    const port = await this.findAvailablePort();

    const container = await this.docker.createContainer({
      Image: `${vps.operationSystem.image}:${vps.operationSystem.tag}`,
      HostConfig: {
        PortBindings: {
          '22/tcp': [
            {
              HostPort: port.toString(),
            },
          ],
        },
        Memory: vps.hardwareConfig.ram,
        NanoCpus: vps.hardwareConfig.cpu,
      },
      Env: [`USER_NAME=${vps.username}`, `USER_PASSWORD=${vps.password}`],
      ExposedPorts: {
        '22/tcp': {},
      },
      Tty: true,
    });

    await container.start();

    return {
      containerId: container.id,
      port,
    };
  }

  @OnQueueCompleted({ name: 'create' })
  async onVpsCreateCompleted(
    job: Job<{ vpsId: string }>,
    result: {
      containerId: string;
      port: number;
    },
  ) {
    const { vpsId } = job.data;

    await this.entityManager.update(Vps, vpsId, {
      containerId: result.containerId,
      status: VpsStatus.RUNNING,
      host: process.env.HOST_NAME,
      port: result.port,
    });
  }

  @OnQueueFailed({ name: 'create' })
  async onVpsCreateFailed(job: Job<{ vpsId: string }>) {
    const { vpsId } = job.data;

    await this.entityManager.update(Vps, vpsId, {
      status: VpsStatus.FAILED,
    });
  }
}
