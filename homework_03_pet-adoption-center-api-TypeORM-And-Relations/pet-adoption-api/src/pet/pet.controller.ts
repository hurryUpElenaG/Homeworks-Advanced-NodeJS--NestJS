import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { PetService } from './pet.service';

import { CreatePetDto, QueryPetsDto } from './dto/pet-create.dto';
import { UpdatePetDto } from './dto/pet-update.dto';
import { PartiallyUpdatePetDto } from './dto/pet-partially-update.dto';
import { PetResponseDto } from './dto/pet-response.dto';

import { UpdateMedicalDto } from '../medical/dto/medical-update.dto';
import { AdoptPetDto } from './dto/pet-adopt.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getAllPets(@Query() query: QueryPetsDto): Promise<PetResponseDto[]> {
    return this.petService.getAllPets(query);
  }

  @Get(':id')
  getPetById(@Param('id', ParseUUIDPipe) id: string): Promise<PetResponseDto> {
    return this.petService.getPetResponseDtoById(id);
  }

  @Post()
  createPet(@Body() body: CreatePetDto) {
    return this.petService.createPet(body);
  }

  @Put(':id')
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePetDto,
  ) {
    return this.petService.updatePet(id, body);
  }

  @Patch(':id')
  partiallyUpdatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PartiallyUpdatePetDto,
  ) {
    return this.petService.partiallyUpdatePet(id, body);
  }

  @Patch(':id/medical')
  updateMedical(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMedicalDto,
  ) {
    return this.petService.updateMedical(id, body);
  }

  @Post(':id/adopt')
  adoptPet(@Param('id', ParseUUIDPipe) id: string, @Body() body: AdoptPetDto) {
    return this.petService.adoptPet(id, body.adopterId);
  }

  @Post(':id/return')
  returnPet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.returnPet(id);
  }

  @Get(':id/adoptions')
  getAdoptionHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.getAdoptionHistory(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.deletePet(id);
  }

  @Post(':petId/tags/:tagId')
  attachTag(
    @Param('petId', ParseUUIDPipe) petId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.petService.attachTag(petId, tagId);
  }

  @Delete(':petId/tags/:tagId')
  detachTag(
    @Param('petId', ParseUUIDPipe) petId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.petService.detachTag(petId, tagId);
  }
}
