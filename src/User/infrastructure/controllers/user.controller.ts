import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { IUserRepository } from '../../application/interfaces/user.repository.interface';
import { UserRepository } from '../repositories/user.repository';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
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
