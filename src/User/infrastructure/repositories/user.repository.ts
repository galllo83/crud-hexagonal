import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../application/interfaces/user.repository.interface';
import { UserService } from '../../application/services/user.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UserSortParamsEnum } from 'src/helpers/enums/userParamsEnum';
import { OrderParamsEnum } from 'src/helpers/enums/OrderParamsEnum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly userService: UserService) {}
  async findAll(
    sortBy: UserSortParamsEnum,
    order: OrderParamsEnum,
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    return this.userService.findAll(sortBy, order, options);
  }

  async findById(id: number): Promise<User> {
    return this.userService.findById(id);
  }

  async create(user: CreateUserDto): Promise<void> {
    return this.userService.create(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<void> {
    return await this.userService.update(id, user);
  }

  async delete(id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
