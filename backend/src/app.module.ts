import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js'; // Added .js extension
import { AppService } from './app.service.js'; // Added .js extension

// Imports for our new modules (must use .js extension for nodenext)
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { CommonModule } from './common/common.module.js'; 

@Module({
  imports: [
    PrismaModule,   
    CommonModule,   
    UsersModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}