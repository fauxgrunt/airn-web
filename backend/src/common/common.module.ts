import { Module, Global } from '@nestjs/common';
import { BcryptService } from './bcrypt.service.js'; // Added .js extension

@Global()
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class CommonModule {}