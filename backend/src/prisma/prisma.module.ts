import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 1. Add @Global() decorator to make it available everywhere
@Global()
@Module({
  providers: [PrismaService],
  // 2. Export the service so other modules can use it
  exports: [PrismaService],
})
export class PrismaModule {}