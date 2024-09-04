import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AddressDto } from '../../../helpers/address.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'Ulises', description: 'User name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'ulisesnm@gmail.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: AddressDto, description: 'User address' })
  readonly address: AddressDto;
}
