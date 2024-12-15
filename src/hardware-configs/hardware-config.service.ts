import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateHardwareConfigDto } from '@hardware-configs/dto/create-hardware-config';
import { HardwareConfig } from '@hardware-configs/entity/hardware-config.entity';

@Injectable()
export class HardwareConfigService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createHardwareConfig(createHardwareConfigDto: CreateHardwareConfigDto) {
    const hardwareConfig = this.entityManager.create(HardwareConfig, {
      ...createHardwareConfigDto,
    });

    await this.entityManager.insert(HardwareConfig, hardwareConfig);

    return hardwareConfig;
  }

  async getHardwareConfigs() {
    return await this.entityManager.find(HardwareConfig);
  }

  async deleteHardwareConfig(hardwareConfigId: number) {
    return await this.entityManager.delete(HardwareConfig, hardwareConfigId);
  }

  async updateHardwareConfig(
    hardwareConfigId: number,
    updateHardwareConfigDto: CreateHardwareConfigDto,
  ) {
    await this.entityManager.update(HardwareConfig, hardwareConfigId, {
      ...updateHardwareConfigDto,
    });
  }
}
