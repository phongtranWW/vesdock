import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateHardwareConfigDto {
  @ApiProperty({ type: 'number', description: 'RAM in B' })
  @IsNumber()
  ram: number;

  @ApiProperty({ type: 'number', description: 'CPU in Hz' })
  @IsNumber()
  cpu: number;

  @ApiProperty({ type: 'number', description: 'Disk in GB' })
  @IsNumber()
  disk: number;
}
