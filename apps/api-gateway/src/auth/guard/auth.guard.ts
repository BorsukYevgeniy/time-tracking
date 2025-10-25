import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthRequest } from '../../common/types/auth-request.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@shared/config';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    const token = req.cookies?.accessToken;

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token)

      req.user = payload;
      return true;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
