// F:\Projects\airn-web\backend\src\users\dto\create-user.dto.ts

import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

// This MUST be explicitly exported (fixes TS2459)
export class CreateUserDto { 
  @IsEmail({}, { message: 'Must be a valid email address.' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}