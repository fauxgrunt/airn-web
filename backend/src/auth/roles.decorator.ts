import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// Define the key used to store the roles in metadata
export const ROLES_KEY = 'roles';

/**
 * Custom decorator to specify which user roles are allowed to access a route.
 * @param roles An array of required Role enums (e.g., [Role.ADMIN, Role.USER]).
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);