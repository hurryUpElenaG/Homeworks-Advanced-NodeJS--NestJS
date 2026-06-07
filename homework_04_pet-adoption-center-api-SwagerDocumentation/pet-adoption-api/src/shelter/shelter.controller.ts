import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/shelter-create.dto';
import { UpdateShelterDto } from './dto/shelter-update.dto';
import { ShelterResponseDto } from './dto/shelter-response.dto';

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @ApiOperation({
    summary: 'Create a shelter',
  })
  @ApiBody({
    type: CreateShelterDto,
  })
  @ApiCreatedResponse({
    description: 'Shelter created successfully',
    type: ShelterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @Post()
  createShelter(@Body() body: CreateShelterDto) {
    return this.shelterService.createShelter(body);
  }

  @ApiOperation({
    summary: 'Get all shelters',
  })
  @ApiOkResponse({
    description: 'Shelters retrieved successfully',
    type: [ShelterResponseDto],
  })
  @Get()
  getAllShelters() {
    return this.shelterService.getAllShelters();
  }

  @ApiOperation({
    summary: 'Get shelter by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Shelter ID',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Shelter found',
    type: ShelterResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Shelter not found',
  })
  @Get(':id')
  getShelterById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ShelterResponseDto> {
    return this.shelterService.getShelterResponseDtoById(id);
  }

  @ApiOperation({
    summary: 'Update a shelter',
  })
  @ApiParam({
    name: 'id',
    description: 'Shelter ID',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateShelterDto,
  })
  @ApiOkResponse({
    description: 'Shelter updated successfully',
    type: ShelterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Shelter not found',
  })
  @Patch(':id')
  updateShelter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateShelterDto,
  ) {
    return this.shelterService.updateShelter(id, body);
  }

  @ApiOperation({
    summary: 'Delete a shelter',
  })
  @ApiParam({
    name: 'id',
    description: 'Shelter ID',
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Shelter deleted successfully',
  })
  @ApiConflictResponse({
    description: 'Shelter cannot be deleted while it still has pets',
  })
  @ApiNotFoundResponse({
    description: 'Shelter not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteShelter(@Param('id', ParseUUIDPipe) id: string) {
    return this.shelterService.deleteShelter(id);
  }
}
