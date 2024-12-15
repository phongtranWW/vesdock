import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VpsModule } from '@vpses/vps.module';
import { OperationSystemModule } from '@operation-systems/operation-system.module';
import { HardwareConfigModule } from '@hardware-configs/hardware-config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@configs/database.config';
import docsConfig from '@configs/docs.config';
import { bullConfig, vpsQueueConfig } from '@configs/queue.config';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [databaseConfig, docsConfig, bullConfig, vpsQueueConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('database'),
    }),
    VpsModule,
    OperationSystemModule,
    HardwareConfigModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
