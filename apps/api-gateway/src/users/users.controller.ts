import { Role } from '@contracts/users';
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequieredRoles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { UsersService } from './users.service';

@Controller('users')
@ApiCookieAuth('accessToken')
@ApiUnauthorizedResponse({ description: 'Unauthorized user' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Delete user by id' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiOkResponse({ description: 'Deleted succesfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete(':userId')
  @RequieredRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }

  @ApiOperation({ description: 'Delete my account' })
  @ApiOkResponse({ description: 'Deleted succesfully' })
  @Delete('me')
  @UseGuards(AuthGuard)
  deleteMe(@User() user: JwtPayload) {
    return this.usersService.delete(user.id);
  }
}
