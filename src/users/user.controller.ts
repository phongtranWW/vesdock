import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@users/user.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(
      registerDto.username,
      registerDto.password,
    );
  }
}
