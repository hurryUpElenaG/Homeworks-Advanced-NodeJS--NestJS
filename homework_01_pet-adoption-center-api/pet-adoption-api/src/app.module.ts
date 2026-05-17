import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PetController } from './pet/pet.controller';
import { PetService } from './pet/pet.service';
import { PET_ID_GENERATOR, type PetIdGenerator } from './common/providers/id-generator';


@Module({
  imports: [],
  controllers: [AppController, PetController],
  providers: [PetService,
    {
      provide: PET_ID_GENERATOR,
      useFactory: (): PetIdGenerator => (): number => Date.now(),
    }
  ],
})
export class AppModule {}



