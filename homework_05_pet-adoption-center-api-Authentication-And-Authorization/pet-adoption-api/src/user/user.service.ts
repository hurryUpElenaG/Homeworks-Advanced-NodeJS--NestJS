import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, passwordHash: string): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = this.userRepository.create({
      email,
      passwordHash,
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email=:email', {
        email,
      })
      .getOne();

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async saveRefreshToken(userId: string, hash: string) {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        refreshTokenHash: hash,
      })
      .where('id=:id', {
        id: userId,
      })
      .execute();
  }

  async findUserWithRefreshToken(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.refreshTokenHash'])
      .where('user.id=:id', {
        id,
      })
      .getOne();
  }
}
