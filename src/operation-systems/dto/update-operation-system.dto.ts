import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOperationSystemDto {
  @ApiProperty({
    type: 'string',
    description: 'Operation system name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'Operation system version',
    required: false,
  })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty({
    type: 'string',
    description: 'Operation system description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Operation system image',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    type: 'string',
    description: 'Operation system tag',
    required: false,
  })
  @IsString()
  @IsOptional()
  tag?: string;
}
