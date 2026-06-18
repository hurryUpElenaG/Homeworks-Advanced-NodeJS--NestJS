import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

import * as crypto from 'crypto';
import { UnauthorizedException } from '@nestjs/common';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(credentials: RegisterDto): Promise<User> {
    const passwordHash = await bcrypt.hash(credentials.password, 10);

    const user = await this.userService.createUser(
      credentials.email,
      passwordHash,
    );

    return user;
  }

  //login with refresh tokens
  async login(credentials: LoginDto) {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const { passwordHash, refreshTokenHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  //Refresh tokens(bonus A)
  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );

    const refreshToken = crypto.randomBytes(32).toString('hex');

    const hash = await bcrypt.hash(refreshToken, 10);

    await this.userService.saveRefreshToken(user.id, hash);

    return {
      accessToken,
      refreshToken,
    };
  }

  //refresh token(bonus A)
  async refresh(body: RefreshDto) {
    const user = await this.userService.findUserWithRefreshToken(body.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isTokenValid = await bcrypt.compare(
      body.refreshToken,
      user.refreshTokenHash!,
    );

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
