import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

import { Public } from './decorators/public.decorator';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiConflictResponse({
    description: 'Email is already in use.',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    type: User,
  })
  register(@Body() credentials: RegisterDto): Promise<User> {
    return this.authService.register(credentials);
  }

  @Post('login')
  @Public()
  @ApiOperation({
    summary: 'Login a User',
  })
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    description: 'Invalid credentials.',
  })
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    description: 'Access token refreshed successfully. Token pair returned.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired refresh token.',
  })
  @Public()
  refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body);
  }
}
