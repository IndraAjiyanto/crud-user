import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findByEmail(email:string){
    return await this.usersRepository.findOne({
      where: {
        email,
      }
    })
  }

    async findByid(id:number){
    return await this.usersRepository.findOne({
      where: {
        id,
      }
    })
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({
      where : {username}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findByid(id);
    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findByid(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.usersRepository.remove(user);
  }
}
