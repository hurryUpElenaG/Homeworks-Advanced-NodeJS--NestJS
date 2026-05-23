import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  ParseUUIDPipe,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PetsService } from './pet.service';

import { CreatePetDto } from './dto/pet-create.dto';
import { QueryPetsDto } from './dto/query-pets.dto';
import { UpdatePetDto } from './dto/pet-update.dto';
import { PartiallyUpdatePetDto } from './dto/pet-partially-update.dto';

import { PetDto } from './dto/pet.dto';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
  ) {}

  /*@Get()
  getAllPets(): PetDto[] {
    return this.petsService.getAllPets();
  }*/

  @Get()
  search(@Query() query: QueryPetsDto) {
    return this.petsService.search(query);
  }

  @Get(':id')
  getPetById(@Param('id', ParseUUIDPipe) id: string): PetDto {
    return this.petsService.getPetById(id);
  }

  @Post()
  createPet(@Body() body: CreatePetDto) {
    return this.petsService.createPet(body);
  }

  @Put(':id')
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePetDto,
  ): PetDto {
    return this.petsService.updatePet(id, body);
  }

  @Patch(':id')
  partiallyUpdatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PartiallyUpdatePetDto,
  ): PetDto {
    return this.petsService.partiallyUpdatePet(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePet(@Param('id', ParseUUIDPipe) id: string): void {
    return this.petsService.deletePet(id);
  }

  @Patch(':id/adopt')
  adoptPet(@Param('id', ParseUUIDPipe) id: string): PetDto {
    return this.petsService.adoptPet(id);
  }

  @Patch(':id/return')
  returnPet(@Param('id', ParseUUIDPipe) id: string): PetDto {
    return this.petsService.returnPet(id);
  }
}