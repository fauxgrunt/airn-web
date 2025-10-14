import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js'; // Added .js extension
import { CommonModule } from '../common/common.module.js'; // Added .js extension

@Module({
  imports: [CommonModule], 
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}