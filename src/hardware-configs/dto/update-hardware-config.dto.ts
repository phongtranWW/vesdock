import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateHardwareConfigDto {
  @ApiProperty({ type: 'number', description: 'RAM in B', required: false })
  @IsOptional()
  @IsNumber()
  ram?: number;

  @ApiProperty({ type: 'number', description: 'CPU in Hz', required: false })
  @IsOptional()
  @IsNumber()
  cpu?: number;

  @ApiProperty({ type: 'number', description: 'Disk in GB', required: false })
  @IsOptional()
  @IsNumber()
  disk?: number;
}
