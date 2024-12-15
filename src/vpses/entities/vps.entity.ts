import { HardwareConfig } from 'src/hardware-configs/entity/hardware-config.entity';
import { OperationSystem } from 'src/operation-systems/entity/operation-system.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VpsStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  DELETED = 'deleted',
  FAILED = 'failed',
  CREATING = 'creating',
}

@Entity('vpses')
export class Vps {
  @PrimaryColumn({ type: 'uuid', name: 'vps_id' })
  vpsId: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: VpsStatus, default: VpsStatus.CREATING })
  status: VpsStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  host: string;

  @Column({ type: 'integer', nullable: true })
  port: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'container_id',
    nullable: true,
  })
  containerId: string;

  @Column({ type: 'integer', name: 'operation_system_id' })
  operationSystemId: number;

  @ManyToOne(() => OperationSystem)
  @JoinColumn({ name: 'operation_system_id' })
  operationSystem: OperationSystem;

  @Column({ type: 'integer', name: 'hardware_config_id' })
  hardwareConfigId: number;

  @ManyToOne(() => HardwareConfig)
  @JoinColumn({ name: 'hardware_config_id' })
  hardwareConfig: HardwareConfig;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
