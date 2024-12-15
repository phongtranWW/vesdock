import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOperationSystemDto {
  @ApiProperty({ type: 'string', description: 'Operation system name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', description: 'Operation system version' })
  @IsString()
  version: string;

  @ApiProperty({
    type: 'string',
    description: 'Operation system description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'string', description: 'Operation system image' })
  @IsString()
  image: string;

  @ApiProperty({ type: 'string', description: 'Operation system tag' })
  @IsString()
  tag: string;
}
