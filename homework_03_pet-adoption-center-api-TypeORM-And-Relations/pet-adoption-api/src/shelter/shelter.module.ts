import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { Pet } from '../pet/entities/pet.entity';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter, Pet])],
  controllers: [ShelterController],
  providers: [ShelterService],
  exports: [ShelterService],
})
export class ShelterModule {}
