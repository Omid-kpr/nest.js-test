import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    console.log(`got a user in user.service inside create function with createUserDto: ${createUserDto}`);
    createUserDto.password = await hash(createUserDto.password);
    console.log("hashed password succefuly")
    const user = this.userRepository.create(createUserDto)
    console.log(`user created: ${user}`)
    return this.userRepository.save(user);
  }

  async findAnyUser() {
    const count = await this.userRepository.count();
    return count > 0;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      }
    });
  }

}
