import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OperationSystem } from '@operation-systems/entity/operation-system.entity';
import { CreateOperationSystemDto } from '@operation-systems/dto/create-operation-system.dto';
import { UpdateOperationSystemDto } from '@operation-systems/dto/update-operation-system.dto';

@Injectable()
export class OperationSystemService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createOperationSystem(
    createOperationSystemDto: CreateOperationSystemDto,
  ) {
    const operationSystem = this.entityManager.create(OperationSystem, {
      ...createOperationSystemDto,
    });
    await this.entityManager.insert(OperationSystem, operationSystem);

    return operationSystem;
  }

  async getOperationSystems() {
    return await this.entityManager.find(OperationSystem, {
      select: {
        operationSystemId: true,
        name: true,
        version: true,
        description: true,
        image: true,
        tag: true,
      },
    });
  }

  async updateOperationSystem(
    operationSystemId: number,
    updateOperationSystemDto: UpdateOperationSystemDto,
  ) {
    await this.entityManager.update(OperationSystem, operationSystemId, {
      ...updateOperationSystemDto,
    });
  }

  async deleteOperationSystem(operationSystemId: number) {
    await this.entityManager.delete(OperationSystem, operationSystemId);
  }
}
