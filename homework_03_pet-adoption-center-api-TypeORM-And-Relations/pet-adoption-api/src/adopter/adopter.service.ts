import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Adopter } from './entities/adopter.entity';
import { Adoption } from '../adoption/entities/adoption.entity';
import { CreateAdopterDto } from './dto/adopter-create.dto';
import { UpdateAdopterDto } from './dto/adopter-update.dto';

@Injectable()
export class AdopterService {
  constructor(
    @InjectRepository(Adopter)
    private readonly adopterRepository: Repository<Adopter>,

    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
  ) {}

  async createAdopter(body: CreateAdopterDto): Promise<Adopter> {
    const existingAdopter = await this.adopterRepository.findOne({
      where: {
        email: ILike(body.email),
      },
    });

    if (existingAdopter) {
      throw new ConflictException(`Adopter with email ${body.email} already exists`);
    }

    const adopter = this.adopterRepository.create(body);

    return this.adopterRepository.save(adopter);
  }

  async getAllAdopters(): Promise<Adopter[]> {
    return this.adopterRepository.find();
  }

  async getAdopterById(id: string): Promise<Adopter> {
    const adopter = await this.adopterRepository.findOne({
      where: { id },

      relations: {
        adoptions: {
          pet: true,
        },
      },
    });

    if (!adopter) {
      throw new NotFoundException(`Adopter with ID ${id} not found`);
    }

    return adopter;
  }

  async updateAdopter(id: string, body: UpdateAdopterDto): Promise<Adopter> {
    const adopter = await this.getAdopterById(id);

    if (body.email) {
      const existing = await this.adopterRepository.findOne({
        where: {
          email: ILike(body.email),
        },
      });

      if (existing && existing.id !== id) {
        throw new ConflictException(`Email ${body.email} already exists`);
      }
    }

    Object.assign(adopter, body);

    return this.adopterRepository.save(adopter);
  }

  async deleteAdopter(id: string): Promise<void> {
    const adopter = await this.getAdopterById(id);

    await this.adopterRepository.softRemove(adopter);
  }
}
