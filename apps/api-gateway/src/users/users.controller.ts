import { Role } from '@contracts/users';
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RequieredRoles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':userId')
  @RequieredRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  deleteMe(@User() user: JwtPayload) {
    return this.usersService.delete(user.id);
  }
}
