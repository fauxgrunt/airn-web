import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get the required roles set by our custom @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), 
      context.getClass(),
    ]);

    // If no roles are required, allow access.
    if (!requiredRoles) {
      return true;
    }

    // 2. Get the authenticated user object (injected by JwtStrategy)
    const request = context.switchToHttp().getRequest();
    const user = request.user as { userId: number; email: string; role: Role };
    
    // 3. Check if the user's role is included in the list of required roles
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRole) {
        // Throw a Forbidden error instead of just returning false
        throw new ForbiddenException(`Requires role(s): ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}