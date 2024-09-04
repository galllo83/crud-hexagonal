import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AddressDto } from 'src/helpers/address.dto';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ulises', description: 'User name' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'ulisesnm@gmail.com', description: 'User email' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: AddressDto, description: 'User email' })
  @IsOptional()
  readonly address?: AddressDto;
}
