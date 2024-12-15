import { HardwareConfig } from '@hardware-configs/entity/hardware-config.entity';
import { registerAs } from '@nestjs/config';
import { OperationSystem } from '@operation-systems/entity/operation-system.entity';
import { User } from '@users/enities/user.entity';
import { Vps } from '@vpses/entities/vps.entity';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME,
  entities: [Vps, OperationSystem, HardwareConfig, User],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
}));
