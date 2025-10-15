import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { CommonModule } from './common/common.module.js'; 
import { AuthModule } from './auth/auth.module.js';
import { ProductsModule } from './products/products.module.js'; // <-- NEW IMPORT

@Module({
  imports: [
    PrismaModule,   
    CommonModule,   
    UsersModule,    
    AuthModule,
    ProductsModule, // <-- REGISTERED MODULE
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}