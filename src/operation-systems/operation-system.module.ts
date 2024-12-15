import { Module } from '@nestjs/common';
import { OperationSystemService } from './operation-system.service';
import { OperationSystemController } from './operation-system.controller';

@Module({
  controllers: [OperationSystemController],
  providers: [OperationSystemService],
})
export class OperationSystemModule {}
