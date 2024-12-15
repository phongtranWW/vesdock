import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hardware_configs')
export class HardwareConfig {
  @PrimaryGeneratedColumn('increment', { name: 'hardware_config_id' })
  hardwareConfigId: number;

  @Column({ type: 'integer' })
  ram: number;

  @Column({ type: 'integer' })
  cpu: number;

  @Column({ type: 'integer' })
  disk: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
