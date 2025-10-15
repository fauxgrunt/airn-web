import { 
  Body, 
  Controller, 
  Post, 
  UsePipes, 
  ValidationPipe, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
// FIX: Changed from '@/users/dto/create-user.dto.js' to relative path
import { CreateUserDto } from '../users/dto/create-user.dto.js'; 
import { LoginDto } from './dto/login.dto.js'; 
import { User } from '@prisma/client';

// Define the type for the user object returned without the password
type UserWithoutPassword = Omit<User, 'password'>; 

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}