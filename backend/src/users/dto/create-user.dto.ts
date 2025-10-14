import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}