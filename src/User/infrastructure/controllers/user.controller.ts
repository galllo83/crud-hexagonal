import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { IUserRepository } from '../../application/interfaces/user.repository.interface';
import { UserRepository } from '../repositories/user.repository';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserRepository)
    private readonly userService: IUserRepository,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'The user has been found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiQuery({
    name: 'page',
    example: 1,
    required: true,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    example: 10,
    required: true,
    description: 'Record limit',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      //route: 'http://cats.com/cats', to show links pages
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The user has been found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The user has been deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
