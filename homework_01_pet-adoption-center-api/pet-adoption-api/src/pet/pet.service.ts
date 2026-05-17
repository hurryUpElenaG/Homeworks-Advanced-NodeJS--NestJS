import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type {
  Pet,
  CreatePet,
  PartiallyUpdatePet,
  UpdatePet,
} from './pet.interface';
import {
  PET_ID_GENERATOR,
  type PetIdGenerator,
} from '../common/providers/id-generator';

@Injectable()
export class PetService {
  private pets: Pet[] = [
    {
      id: 1,
      name: 'Jimmy',
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      status: 'available',
    },
    {
      id: 2,
      name: 'Blacky',
      species: 'Dog',
      breed: 'Labrador',
      age: 3,
      status: 'available',
    },
    {
      id: 3,
      name: 'Kevin',
      species: 'Rabbit',
      breed: 'Netherland Dwarf',
      age: 2,
      status: 'adopted',
    },
    {
      id: 4,
      name: 'Elena',
      species: 'Parrot',
      breed: 'African Grey',
      age: 1,
      status: 'available',
    },
    {
      id: 5,
      name: 'Blondy',
      species: 'Dog',
      breed: 'Beagle',
      age: 3,
      status: 'available',
    },
    {
      id: 6,
      name: 'Jonka',
      species: 'Cat',
      breed: 'Maine Coon',
      age: 4,
      status: 'adopted',
    },
  ];

  constructor(
    @Inject(PET_ID_GENERATOR) private readonly newId: PetIdGenerator,
  ) {}

  getAllPets(): Pet[] {
    return this.pets;
  }

  search(species: string): Pet[] {
    if (!species) {
      return this.pets;
    }
    return this.pets.filter(
      (pet) => pet.species.toLowerCase() === species.toLowerCase(),
    );
  }

  getPetById(id: string): Pet {
    const pet = this.pets.find((pet) => pet.id === Number(id));

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  createPet(body: CreatePet): Pet {
    const newPet: Pet = {
      ...body,
      status: 'available',
      id: this.newId(),
    };

    this.pets.push(newPet);

    return newPet;
  }

  updatePet(id: string, body: UpdatePet): Pet {
    const existingPetIndex = this.pets.findIndex(
      (pet) => pet.id === Number(id),
    );

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets[existingPetIndex] = {
      ...body,
      id: Number(id),
      status: this.pets[existingPetIndex].status,
    };

    return this.pets[existingPetIndex];
  }

  partiallyUpdatePet(id: string, body: PartiallyUpdatePet): Pet {
    const existingPetIndex = this.pets.findIndex(
      (pet) => pet.id === Number(id),
    );

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets[existingPetIndex] = {
      ...this.pets[existingPetIndex],
      ...body,
      id: Number(id),
    };

    return this.pets[existingPetIndex];
  }

  deletePet(id: string): void {
    const existingPetIndex = this.pets.findIndex(
      (pet) => pet.id === Number(id),
    );

    if (existingPetIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets = this.pets.filter((pet) => pet.id !== Number(id));
  }

  adoptPet(id: string): Pet {
    const pet = this.getPetById(id);

    if (pet.status === 'adopted') {
      throw new BadRequestException(`Pet with ID ${id} is already adopted`);
    }

    pet.status = 'adopted';

    return pet;
  }

  returnPet(id: string): Pet {
    const pet = this.getPetById(id);

    if (pet.status === 'available') {
      throw new BadRequestException(`Pet with ID ${id} is already available`);
    }

    pet.status = 'available';

    return pet;
  }
}
