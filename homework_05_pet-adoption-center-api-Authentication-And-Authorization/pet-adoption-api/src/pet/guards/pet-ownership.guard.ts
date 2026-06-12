import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';
import { UserRole } from '../../user/enums/user-role.enum';
import { AuthUser } from '../../auth/types/auth-user';

@Injectable()
export class PetOwnershipGuard implements CanActivate {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ params: { id: string }; user: AuthUser }>();

    const user = request.user;
    const petId = request.params.id;

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
        ownerId: user.id,
      },
      relations: { owner: true },
    });

    if (!pet) {
      throw new ForbiddenException(
        'You do not have permissions to modify this pet.',
      );
    }

    return true;
  }
}
