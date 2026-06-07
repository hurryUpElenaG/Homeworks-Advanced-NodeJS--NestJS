import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './db/database.module';
import { PetModule } from './pet/pet.module';
import { ShelterModule } from './shelter/shelter.module'; 
import { TagModule } from './tag/tag.module';
import { AdopterModule } from './adopter/adopter.module';

@Module({
  imports: [
    PetModule,
    ShelterModule,
    TagModule,
    AdopterModule,
    LoggerModule.forRoot({ level: 'info' }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}









