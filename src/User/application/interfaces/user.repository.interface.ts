import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface IUserRepository {
  findAll(options: IPaginationOptions): Promise<Pagination<User>>;
  findById(id: number): Promise<User>;
  create(user: CreateUserDto): Promise<void>;
  update(id: number, user: UpdateUserDto): Promise<void>;
  delete(id: number): Promise<void>;
}

export interface IResponse {
  message: string;
  code: number;
}
