import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from '../../common/types/auth-request.type';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { RequieredRoles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    const token = req.cookies.accessToken;

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const requiredRole = this.reflector.get(
        RequieredRoles,
        context.getHandler(),
      );

      if (requiredRole !== req.user.role) throw new ForbiddenException();

      req.user = payload;
      return true;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
