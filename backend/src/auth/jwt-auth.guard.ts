import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 'jwt' is the default name of the strategy we extended in jwt.strategy.ts
export class JwtAuthGuard extends AuthGuard('jwt') {}