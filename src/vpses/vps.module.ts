import { Module } from '@nestjs/common';
import { VpsService } from './vps.service';
import { VpsController } from './vps.controller';
import * as Docker from 'dockerode';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { VpsProcessor } from './vps.processor';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('bull'),
    }),
    BullModule.registerQueueAsync({
      name: 'vps',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('vpsQueue'),
    }),
  ],
  controllers: [VpsController],
  providers: [
    VpsService,
    {
      provide: 'DOCKER',
      useValue: new Docker({ socketPath: '/var/run/docker.sock' }),
    },
    VpsProcessor,
  ],
})
export class VpsModule {}
