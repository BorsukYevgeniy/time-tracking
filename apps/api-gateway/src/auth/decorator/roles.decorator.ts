import { Reflector } from '@nestjs/core';
import { Role } from '@contracts/users';

export const Roles = Reflector.createDecorator<Role>();
