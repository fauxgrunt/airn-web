import { Injectable } from '@nestjs/common';
// Imports use .js extensions
import { PrismaService } from '../prisma/prisma.service.js'; 
import { BcryptService } from '../common/bcrypt.service.js';
import { CreateUserDto } from './dto/create-user.dto.js'; 
import { User } from '@prisma/client';

// Helper type to exclude the password field from the full User type
type UserWithoutPassword = Omit<User, 'password'>; 

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  /**
   * Creates a new User record in the database.
   */
  async create(data: CreateUserDto): Promise<UserWithoutPassword> { 
    // 1. Hash the password
    const hashedPassword = await this.bcryptService.hash(data.password);

    // 2. Create the user
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword, 
        role: 'USER', 
      },
      // 3. Select which fields to return (excludes password)
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as UserWithoutPassword; 

    return newUser;
  }

  /**
   * Finds a user by their email address (includes password for login comparison).
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}