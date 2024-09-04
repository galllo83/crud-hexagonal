import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/User/domain/entities/user.entity';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { CreateUserDto } from 'src/User/domain/dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new User();
    Object.assign(user, createUserDto);
    await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();
    Object.assign(user, updateUserDto);
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();
    await this.userRepository.softDelete(id);
  }
}
