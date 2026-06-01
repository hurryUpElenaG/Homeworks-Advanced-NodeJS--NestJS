import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { Shelter } from '../shelter/entities/shelter.entity';
import { Tag } from '../tag/entities/tag.entity';
import { MedicalRecord } from './entities/medical-record.entity';
import { Adoption } from '../adoption/entities/adoption.entity';
import { Adopter } from '../adopter/entities/adopter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pet,
      Shelter,
      Tag,
      MedicalRecord,
      Adoption,
      Adopter,
    ]),
  ],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}



