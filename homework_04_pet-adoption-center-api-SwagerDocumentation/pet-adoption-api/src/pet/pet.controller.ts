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

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({
    summary: 'Get all pets',
    description:
      'Returns a list of pets with support for pagination, filtering, searching, and sorting.',
  })
  @ApiOkResponse({
    description: 'Pets retrieved successfully',
    type: [PetResponseDto],
  })
  @Get()
  getAllPets(@Query() query: QueryPetsDto): Promise<PetResponseDto[]> {
    return this.petService.getAllPets(query);
  }

  @ApiOperation({
    summary: 'Get pet by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Pet successfully found',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Get(':id')
  getPetById(@Param('id', ParseUUIDPipe) id: string): Promise<PetResponseDto> {
    return this.petService.getPetResponseDtoById(id);
  }

  @ApiOperation({
    summary: 'Create a new pet',
  })
  @ApiBody({
    type: CreatePetDto,
  })
  @ApiCreatedResponse({
    description: 'Pet created successfully',
    type: PetResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Shelter not found',
  })
  @Post()
  createPet(@Body() body: CreatePetDto) {
    return this.petService.createPet(body);
  }

  @ApiOperation({
    summary: 'Replace an existing pet',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdatePetDto,
  })
  @ApiOkResponse({
    description: 'Pet updated successfully',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Put(':id')
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePetDto,
  ) {
    return this.petService.updatePet(id, body);
  }

  @ApiOperation({
    summary: 'Partially update a pet',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiBody({
    type: PartiallyUpdatePetDto,
  })
  @ApiOkResponse({
    description: 'Pet updated successfully',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @ApiBadRequestResponse({
      description: 'Validation failed',
    })
  @Patch(':id')
  partiallyUpdatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PartiallyUpdatePetDto,
  ) {
    return this.petService.partiallyUpdatePet(id, body);
  }

  @ApiOperation({
    summary: 'Update pet medical information',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateMedicalDto,
  })
  @ApiOkResponse({
    description: 'Medical record updated successfully',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Patch(':id/medical')
  updateMedical(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMedicalDto,
  ) {
    return this.petService.updateMedical(id, body);
  }

  @ApiOperation({
    summary: 'Adopt a pet',
  })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    format: 'uuid',
  })
  @ApiBody({
    type: AdoptPetDto,
  })
  @ApiOkResponse({
    description: 'Pet adopted successfully',
    type: PetResponseDto,
  })
  @ApiConflictResponse({
    description: 'Pet is already adopted',
  })
  @ApiNotFoundResponse({
    description: 'Pet or adopter not found',
  })
  @Post(':id/adopt')
  adoptPet(@Param('id', ParseUUIDPipe) id: string, @Body() body: AdoptPetDto) {
    return this.petService.adoptPet(id, body.adopterId);
  }

  @ApiOperation({
    summary: 'Return an adopted pet',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Pet returned successfully',
    type: PetResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Pet is not currently adopted',
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Post(':id/return')
  returnPet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.returnPet(id);
  }

  @ApiOperation({
    summary: 'Get pet adoption history',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Adoption history retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Get(':id/adoptions')
  getAdoptionHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.getAdoptionHistory(id);
  }

  @ApiOperation({
    summary: 'Delete a pet',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Pet deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Pet not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.deletePet(id);
  }

  @ApiOperation({
    summary: 'Attach a tag to a pet',
  })
  @ApiParam({
    name: 'petId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'tagId',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Tag attached successfully',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet or tag not found',
  })
  @Post(':petId/tags/:tagId')
  attachTag(
    @Param('petId', ParseUUIDPipe) petId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.petService.attachTag(petId, tagId);
  }

  @ApiOperation({
    summary: 'Detach a tag from a pet',
  })
  @ApiParam({
    name: 'petId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'tagId',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Tag detached successfully',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Pet or tag not found',
  })
  @Delete(':petId/tags/:tagId')
  detachTag(
    @Param('petId', ParseUUIDPipe) petId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.petService.detachTag(petId, tagId);
  }
}
