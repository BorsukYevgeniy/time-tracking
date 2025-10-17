import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from '../../types/auth-request.type';
import { JwtPayload } from '../../types/jwt-payload.type';
import { ConfigService } from '@shared/config';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    const token = req.cookies.accessToken;

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.JWT_CONFIG.secret,
      });

      const requiredRole = this.reflector.get(Roles, context.getHandler());


      if (requiredRole !== req.user.role) throw new ForbiddenException();

      req.user = payload;
      return true;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
