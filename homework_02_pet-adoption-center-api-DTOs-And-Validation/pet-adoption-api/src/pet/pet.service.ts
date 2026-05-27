import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  PET_ID_GENERATOR,
  type PetIdGenerator,
} from '../common/providers/id-generator';
import { LoggerService } from '../logger/logger.service';

import { randomUUID } from 'crypto';
import { PetDto } from './dto/pet.dto';
import { CreatePetDto, PetStatus } from './dto/pet-create.dto';
import { QueryPetsDto } from './dto/query-pets.dto';

import { UpdatePetDto } from './dto/pet-update.dto';
import { PartiallyUpdatePetDto } from './dto/pet-partially-update.dto';

@Injectable()
export class PetsService {
  private pets: PetDto[] = [];

  constructor(
    @Inject(PET_ID_GENERATOR) private readonly newId: PetIdGenerator,
    private readonly logger: LoggerService,
  ) {}

  /*getAllPets(): PetDto[] {
    this.logger.info('PetsService.getAllPets', 'Retrieving all pets');
    return this.pets;
  }*/

  search(query: QueryPetsDto): PetDto[] {
    return this.pets.filter((pet) => {
      if (
        !query.species &&
        !query.status &&
        query.minAge === undefined &&
        query.maxAge === undefined
      ) {
        this.logger.warn(
          'PetsService.search',
          'No filters provided, returning all pets',
        );

        return this.pets;
      }

      if (query.species && pet.species !== query.species) {
        return false;
      }

      if (query.status && pet.status !== query.status) {
        return false;
      }

      if (query.minAge !== undefined && pet.age < query.minAge) {
        return false;
      }

      if (query.maxAge !== undefined && pet.age > query.maxAge) {
        return false;
      }

      return true;
    });
  }

  getPetById(id: string): PetDto {
    this.logger.info('PetsService.getPetById', `Retrieving pet with ID: ${id}`);
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      this.logger.error(
        'PetsService.getPetById',
        `Pet with ID ${id} not found`,
      );
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.logger.debug('PetsService.getPetById', `Found pet with ID ${id}`);
    return pet;
  }

  createPet(body: CreatePetDto): PetDto {
    const newPet: PetDto = {
      id: randomUUID(),
      name: body.name,
      species: body.species,
      breed: body.breed,
      age: body.age,
      tags: body.tags,
      medical: body.medical,

      // server-controlled
      status: PetStatus.AVAILABLE,
    };

    this.pets.push(newPet);

    return newPet;
  }

  updatePet(id: string, body: UpdatePetDto): PetDto {
    const existingPetIndex = this.pets.findIndex((pet) => pet.id === id);

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets[existingPetIndex] = {
      ...this.pets[existingPetIndex],
      ...body,
      id,
      status: this.pets[existingPetIndex].status,
    };

    return this.pets[existingPetIndex];
  }

  partiallyUpdatePet(id: string, body: PartiallyUpdatePetDto): PetDto {
    const existingPetIndex = this.pets.findIndex((pet) => pet.id === id);

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    // prevent client from changing status
    const { status, ...rest } = body;

    this.pets[existingPetIndex] = {
      ...this.pets[existingPetIndex],
      ...rest,
      id,
    };

    return this.pets[existingPetIndex];
  }

  deletePet(id: string): void {
    const existingPetIndex = this.pets.findIndex((pet) => pet.id === id);

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets.splice(existingPetIndex, 1);
  }

  adoptPet(id: string): PetDto {
    const pet = this.getPetById(id);

    if (pet.status === PetStatus.ADOPTED) {
      throw new BadRequestException('Pet is already adopted');
    }

    pet.status = PetStatus.ADOPTED;

    return pet;
  }

  returnPet(id: string): PetDto {
    const pet = this.getPetById(id);

    if (pet.status === PetStatus.AVAILABLE) {
      throw new BadRequestException('Pet is already available');
    }

    pet.status = PetStatus.AVAILABLE;

    return pet;
  }
}
