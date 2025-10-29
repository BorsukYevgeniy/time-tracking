import { Role } from '@contracts/users';
import { Reflector } from '@nestjs/core';

export const RequieredRoles = Reflector.createDecorator<Role>();
