import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository, IsNull, ILike } from 'typeorm';
import { Pet, PetStatus } from './entities/pet.entity';
import { Shelter } from '../shelter/entities/shelter.entity';
import { Tag } from '../tag/entities/tag.entity';
import { MedicalRecord } from './entities/medical-record.entity';
import { CreatePetDto, QueryPetsDto } from './dto/pet-create.dto';
import { UpdatePetDto } from './dto/pet-update.dto';
import { UpdateMedicalDto } from './dto/medical-update.dto';
import { PartiallyUpdatePetDto } from './dto/pet-partially-update.dto';
import { Adoption } from '../adoption/entities/adoption.entity';
import { Adopter } from '../adopter/entities/adopter.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,

    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(MedicalRecord)
    private readonly medicalRepository: Repository<MedicalRecord>,

    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,

    @InjectRepository(Adopter)
    private readonly adopterRepository: Repository<Adopter>,

    private readonly dataSource: DataSource,
  ) {}

  /*async getAllPets(): Promise<Pet[]> {
    return this.petRepository.find({
      relations: {
        shelter: true,
        tags: true,
        medical: true,
      },
    });
  }*/

async getAllPets({
  query,
  species,
  shelterId,
  adopterId,
  tags,
  sortBy,
  sortDirection,
  page,
  pageSize,
}: QueryPetsDto): Promise<Pet[]> {
  const where: any = {};

  //if (query) {
   // where.name = ILike(`%${query}%`);
  //}

  if (species) {
    where.species = species;
  }

  if (shelterId) {
    where.shelter = {
      id: shelterId,
    };
  }

  if (tags) {
    where.tags = {
      name: ILike(`%${tags}%`),
    };
  }

  if (adopterId) {
    where.adoptions = {
      adopter: {
        id: adopterId,
      },
    };
  }

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return this.petRepository.find({
    where,
    relations: {
      shelter: true,
      tags: true,
      medical: true,
      adoptions: {
        adopter: true,
      },
    },
    order: {
      [sortBy]: sortDirection,
    },
    skip,
    take,
  });
}

  async getPetById(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: {
        shelter: true,
        tags: true,
        medical: true,
        adoptions: {
          adopter: true,
        },
      },
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async createPet(body: CreatePetDto): Promise<Pet> {
    const shelter = await this.shelterRepository.findOne({
      where: {
        id: body.shelterId,
      },
    });

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    let tags: Tag[] = [];

    if (body.tagIds?.length) {
      tags = await this.tagRepository.find({
        where: {
          id: In(body.tagIds),
        },
      });

      if (tags.length !== body.tagIds.length) {
        throw new NotFoundException('One or more tags not found');
      }
    }

    const medical = this.medicalRepository.create({
      vaccinated: body.medical.vaccinated,
      neutered: body.medical.neutered,
      lastCheckup: body.medical.lastCheckup,
      notes: body.medical.notes,
    });

    const pet = this.petRepository.create({
      name: body.name,
      species: body.species,
      breed: body.breed,
      age: body.age,
      shelter,
      tags,
      medical,
    });

    return this.petRepository.save(pet);
  }

  async updatePet(id: string, body: UpdatePetDto): Promise<Pet> {
    const pet = await this.getPetById(id);

    pet.name = body.name;
    pet.species = body.species;
    pet.breed = body.breed;
    pet.age = body.age;

    return this.petRepository.save(pet);
  }

  async partiallyUpdatePet(id: string, body: PartiallyUpdatePetDto): Promise<Pet> {
    const pet = await this.getPetById(id);

    /*Object.assign(pet, body);
    return this.petRepository.save(pet);*/

    const  updatedPet = await this.petRepository.save({
      ...pet,
      ...body
    })

    return updatedPet;
  }

  async updateMedical(id: string, body: UpdateMedicalDto): Promise<MedicalRecord> {
    const pet = await this.getPetById(id);

    //Object.assign(pet.medical, body);
    //return this.medicalRepository.save(pet.medical);

    const updatedMedical = await this.medicalRepository.save({
      ...pet.medical,
      ...body
    })

    return updatedMedical
  }

  async adoptPet(petId: string, adopterId: string): Promise<Pet> {
    return this.dataSource.transaction(async (manager) => {
      const pet = await manager.findOne(Pet, {
        where: { id: petId },
      });

      if (!pet) {
        throw new NotFoundException(`Pet with ID ${petId} not found`);
      }

      if (pet.status === PetStatus.ADOPTED) {
        throw new ConflictException('Pet is already adopted');
      }

      const adopter = await manager.findOne(Adopter, {
        where: {
          id: adopterId,
        },
      });

      if (!adopter) {
        throw new NotFoundException(`Adopter with ID ${adopterId} not found`);
      }

      const openAdoption = await manager.findOne(Adoption, {
        where: {
          pet: {
            id: petId,
          },
          returnedAt: IsNull(),
        },
        relations: {
          pet: true,
        },
      });

      if (openAdoption) {
        throw new ConflictException('Pet already has an open adoption');
      }

      pet.status = PetStatus.ADOPTED;

      await manager.save(pet);

      const adoption = manager.create(Adoption, {
        pet,
        adopter,
        adoptedAt: new Date(),
      });

      await manager.save(adoption);

      return pet;
    });
  }

  async returnPet(petId: string): Promise<Pet> {
    return this.dataSource.transaction(async (manager) => {
      const pet = await manager.findOne(Pet, {
        where: { id: petId },
      });

      if (!pet) {
        throw new NotFoundException(`Pet with ID ${petId} not found`);
      }

      if (pet.status === PetStatus.AVAILABLE) {
        throw new ConflictException('Pet is already available');
      }

      const adoption = await manager.findOne(Adoption, {
        where: {
          pet: {
            id: petId,
          },
          returnedAt: IsNull(),
        },
        relations: {
          pet: true,
        },
      });

      if (!adoption) {
        throw new ConflictException('Open adoption not found');
      }

      adoption.returnedAt = new Date();

      await manager.save(adoption);

      pet.status = PetStatus.AVAILABLE;

      await manager.save(pet);

      return pet;
    });
  }

  async getAdoptionHistory(petId: string): Promise<Adoption[]> {
    const pet = await this.petRepository.findOne({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    return this.adoptionRepository.find({
      where: {
        pet: {
          id: petId,
        },
      },

      relations: {
        adopter: true,
      },

      order: {
        adoptedAt: 'DESC',
      },
    });
  }

  async deletePet(id: string): Promise<void> {
    const pet = await this.getPetById(id);

    const openAdoption = await this.adoptionRepository.findOne({
      where: {
        pet: { id },
        returnedAt: IsNull(),
      },
    });

    if (openAdoption) {
      openAdoption.returnedAt = new Date();

      await this.adoptionRepository.save(openAdoption);
    }

    await this.petRepository.softRemove(pet);
  }

  async attachTag(petId: string, tagId: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id: petId },
      relations: {
        tags: true,
      },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    const tag = await this.tagRepository.findOne({
      where: { id: tagId },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    const alreadyAttached = pet.tags.some(
      (existingTag) => existingTag.id === tag.id,
    );

    if (!alreadyAttached) {
      pet.tags.push(tag);
    }

    return this.petRepository.save(pet);
  }

  async detachTag(petId: string, tagId: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id: petId },
      relations: {
        tags: true,
      },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    pet.tags = pet.tags.filter((tag) => tag.id !== tagId);

    return this.petRepository.save(pet);
  }
}
