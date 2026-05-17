import {  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query, } from '@nestjs/common';
import { PetService } from './pet.service';
import type {
  Pet,
  CreatePet,
  PartiallyUpdatePet,
  UpdatePet,
} from './pet.interface';


@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getAllPets(): Pet[] {
    return this.petService.getAllPets();
  }

  @Get('search')
  search(@Query('species') species: string): Pet[] {
    console.log('Received species:', species);
    return this.petService.search(species);
  }

  @Get(':id')
  getPetById(@Param('id') id: string): Pet {
    console.log('Received ID:', id, typeof id); // Debugging log
    return this.petService.getPetById(id);
  }
 
  @Post()
  createPet(@Body() body: CreatePet): Pet {
    return this.petService.createPet(body);
  }

  @Put(':id')
  updatePet(@Param('id') id: string, @Body() body: UpdatePet) {
    return this.petService.updatePet(id, body);
  }

  @Patch(':id')
  partiallyUpdatePet(
    @Param('id') id: string,
    @Body() body: PartiallyUpdatePet,
  ) {
    return this.petService.partiallyUpdatePet(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  //@HttpCode(204)
  deletePet(@Param('id') id: string): void {
    this.petService.deletePet(id);
  }

  @Patch(':id/adopt')
  adoptPet(@Param('id') id: string): Pet {
    return this.petService.adoptPet(id);
  }

  @Patch(':id/return') 
  returnPet(@Param('id') id: string): Pet {
    return this.petService.returnPet(id);
  }
}
