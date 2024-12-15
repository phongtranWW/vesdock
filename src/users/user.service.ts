import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@users/enities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async register(username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.entityManager.create(User, {
        username,
        password: hashedPassword,
      });
      await this.entityManager.insert(User, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
