import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelter } from './entities/shelter.entity';
import { Pet } from '../pet/entities/pet.entity';
import { CreateShelterDto } from './dto/shelter-create.dto';
import { UpdateShelterDto } from './dto/shelter-update.dto';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,

    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async createShelter(body: CreateShelterDto): Promise<Shelter> {
    const shelter = this.shelterRepository.create(body);

    return this.shelterRepository.save(shelter);
  }

  async getAllShelters(): Promise<Shelter[]> {
    return this.shelterRepository.find();
  }

  async getShelterById(id: string): Promise<Shelter> {
    const shelter = await this.shelterRepository.findOne({
      where: { id },

      relations: {
        pets: true,
      },
    });

    if (!shelter) {
      throw new NotFoundException(`Shelter with ID ${id} not found`);
    }

    return shelter;
  }

  async updateShelter(id: string, body: UpdateShelterDto): Promise<Shelter> {
    const shelter = await this.getShelterById(id);

    Object.assign(shelter, body);

    return this.shelterRepository.save(shelter);
  }

  async deleteShelter(id: string): Promise<void> {
    const shelter = await this.getShelterById(id);

    const petsCount = await this.petRepository.count({
      where: {
        shelter: {
          id,
        },
      },
    });

    if (petsCount > 0) {
      throw new ConflictException('Cannot delete shelter because pets are assigned to it');
    }

    await this.shelterRepository.remove(shelter);
  }
}
