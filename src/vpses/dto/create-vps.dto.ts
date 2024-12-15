import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateVpsDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Vps id',
  })
  @IsUUID()
  vpsId: string;

  @ApiProperty({
    type: 'string',
    description: 'Vps username',
  })
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({
    type: 'string',
    description: 'Vps password',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: 'number',
    description: 'Operation system id',
  })
  @IsNumber()
  operationSystemId: number;

  @ApiProperty({
    type: 'number',
    description: 'Hardware config id',
  })
  @IsNumber()
  hardwareConfigId: number;
}
