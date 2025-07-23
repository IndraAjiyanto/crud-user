// src/seeder/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async run() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await this.userService.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
    });
  }
}
