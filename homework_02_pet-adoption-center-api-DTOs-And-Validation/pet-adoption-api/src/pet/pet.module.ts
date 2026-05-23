import { Module } from '@nestjs/common';
import {
  PET_ID_GENERATOR,
  type PetIdGenerator,
} from '../common/providers/id-generator';
import { PetsController } from './pet.controller';
import { PetsService } from './pet.service';
import { randomUUID } from 'crypto';

@Module({
  imports: [],
  controllers: [PetsController],
  providers: [
    PetsService,
    {
      provide: PET_ID_GENERATOR,
      useFactory: (): PetIdGenerator => (): string => randomUUID(),
    },
  ],
  exports: [],
})
export class PetModule {}