import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { BcryptService } from '../common/bcrypt.service.js';
// FIX: Changed from '@/users/dto/create-user.dto.js' to relative path
import { CreateUserDto } from '../users/dto/create-user.dto.js'; 
import { User, Role } from '@prisma/client';

// Define the structure of the JWT payload
interface JwtPayload {
  userId: number;
  email: string;
  role: Role; // Used 'Role' after final fix
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(data.email);
    
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    return this.usersService.create(data);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password) {
      const isMatch = await this.bcryptService.compare(pass, user.password);
      
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    };
  }
}