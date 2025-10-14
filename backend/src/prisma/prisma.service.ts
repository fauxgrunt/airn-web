import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * The PrismaService extends PrismaClient and handles its connection lifecycle
 * using NestJS hooks. This makes the Prisma client injectable and ready
 * for use across the application.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // 1. The constructor calls the base PrismaClient constructor
  constructor() {
    super();
  }

  // 2. Lifecycle hook: Connect to the database when the module initializes
  async onModuleInit() {
    await this.$connect();
  }

  // 3. Lifecycle hook: Ensure the application cleanly shuts down the Prisma connection
  async onModuleDestroy() {
    await this.$disconnect();
  }
  
  // Note: The low-level this.$on('beforeExit', ...) listener for shutdown 
  // is now correctly placed in src/main.ts for clean application exit management.
}