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

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  createShelter(@Body() body: CreateShelterDto) {
    return this.shelterService.createShelter(body);
  }

  @Get()
  getAllShelters() {
    return this.shelterService.getAllShelters();
  }

  @Get(':id')
  getShelterById(@Param('id', ParseUUIDPipe) id: string,): Promise<ShelterResponseDto> {
    return this.shelterService.getShelterResponseDtoById(id);
  }

  @Patch(':id')
  updateShelter(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateShelterDto) {
    return this.shelterService.updateShelter(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteShelter(@Param('id', ParseUUIDPipe) id: string) {
    return this.shelterService.deleteShelter(id);
  }
}
