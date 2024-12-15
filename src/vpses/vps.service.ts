import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateVpsDto } from '@vpses/dto/create-vps.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OperationSystem } from '@operation-systems/entity/operation-system.entity';
import { HardwareConfig } from '@hardware-configs/entity/hardware-config.entity';
import { Vps } from './entities/vps.entity';

@Injectable()
export class VpsService {
  constructor(
    @InjectQueue('vps')
    private readonly vpsQueue: Queue,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createVps(userId: string, createVpsDto: CreateVpsDto) {
    const { vpsId, username, password, operationSystemId, hardwareConfigId } =
      createVpsDto;
    const operationSystem = await this.entityManager.findOne(OperationSystem, {
      where: { operationSystemId },
      select: {
        image: true,
        tag: true,
      },
    });
    if (!operationSystem) {
      throw new NotFoundException('Operation system not found');
    }

    const hardwareConfig = await this.entityManager.findOne(HardwareConfig, {
      where: { hardwareConfigId },
      select: {
        ram: true,
        cpu: true,
      },
    });
    if (!hardwareConfig) {
      throw new NotFoundException('Hardware config not found');
    }

    try {
      const vps = this.entityManager.create(Vps, {
        vpsId,
        username,
        password,
        userId,
        operationSystemId,
        hardwareConfigId,
      });
      await this.entityManager.insert(Vps, vps);

      await this.vpsQueue.add('create', { vpsId });
      return vps;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVps(vpsId: string, userId: string) {
    return await this.entityManager.findOne(Vps, {
      relations: {
        operationSystem: true,
        hardwareConfig: true,
      },
      where: { vpsId, userId },
    });
  }

  async getUserVpses(userId: string) {
    return await this.entityManager.find(Vps, {
      select: {
        vpsId: true,
        username: true,
        status: true,
        userId: true,
        port: true,
        host: true,
      },
      where: { userId },
    });
  }
}
