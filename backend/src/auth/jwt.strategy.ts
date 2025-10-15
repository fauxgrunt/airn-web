import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client'; // <-- FIXED: Changed UserRole to Role

// Define the structure of the payload we expect after token verification
interface JwtPayload {
  userId: number;
  email: string;
  role: Role; // <-- FIXED: Changed UserRole to Role
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'YOUR_VERY_STRONG_JWT_SECRET_KEY', 
    });
  }

  async validate(payload: JwtPayload) {
    return { 
      userId: payload.userId, 
      email: payload.email, 
      role: payload.role 
    };
  }
}