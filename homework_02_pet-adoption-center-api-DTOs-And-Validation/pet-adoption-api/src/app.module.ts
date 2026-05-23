import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PetModule } from './pet/pet.module';
import { LoggerModule } from './logger/logger.module';



@Module({
  imports: [
    PetModule,
    LoggerModule.forRoot({ level: 'info' }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}






