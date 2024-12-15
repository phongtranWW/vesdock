import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '@users/enities/user.entity';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.entityManager.findOne(User, {
      select: {
        userId: true,
        username: true,
        password: true,
        role: true,
      },
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
