import { Module } from '@nestjs/common';
import { HardwareConfigService } from './hardware-config.service';
import { HardwareConfigController } from './hardware-config.controller';

@Module({
  controllers: [HardwareConfigController],
  providers: [HardwareConfigService],
})
export class HardwareConfigModule {}
