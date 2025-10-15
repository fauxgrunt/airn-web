import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // <-- NEW IMPORT
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    UsersModule,
    PassportModule, // <-- ADD HERE
    JwtModule.register({
      secret: 'YOUR_VERY_STRONG_JWT_SECRET_KEY',
      signOptions: { expiresIn: '7d' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, // Strategy must be a provider
  ],
  // FIX: Export the PassportModule and JwtModule to make the strategy usable by guards
  exports: [AuthService, JwtModule, PassportModule], 
})
export class AuthModule {}