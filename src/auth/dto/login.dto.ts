import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @Length(6, 50)
  username: string;

  @ApiProperty({
    type: 'string',
  })
  @IsStrongPassword()
  password: string;
}
