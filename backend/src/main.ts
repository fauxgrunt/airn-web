import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // Added .js extension
import { PrismaService } from './prisma/prisma.service.js'; // Added .js extension
import { PrismaClient } from '@prisma/client'; 

// Define a type for the client that includes the $on method
type PrismaClientWithOn = PrismaClient & { $on: (event: 'beforeExit', callback: () => Promise<void>) => void };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the PrismaService instance from the application context
  const prismaService = app.get(PrismaService);
  
  // Cast and register the low-level Prisma hook
  (prismaService as PrismaClientWithOn).$on('beforeExit', async () => {
    await app.close();
  });
  
  await app.listen(3000);
}
bootstrap();