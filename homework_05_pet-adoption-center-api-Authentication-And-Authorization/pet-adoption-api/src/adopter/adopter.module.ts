import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopter } from './entities/adopter.entity';
import { Adoption } from '../adoption/entities/adoption.entity';
import { AdopterController } from './adopter.controller';
import { AdopterService } from './adopter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adopter, Adoption])],
  controllers: [AdopterController],
  providers: [AdopterService],
  exports: [AdopterService],
})
export class AdopterModule {}
