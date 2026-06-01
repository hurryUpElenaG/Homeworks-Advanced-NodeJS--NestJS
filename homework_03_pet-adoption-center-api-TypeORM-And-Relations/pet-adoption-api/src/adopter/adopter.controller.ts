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

import { AdopterService } from './adopter.service';
import { CreateAdopterDto } from './dto/adopter-create.dto';
import { UpdateAdopterDto } from './dto/adopter-update.dto';

@Controller('adopter')
export class AdopterController {
  constructor(
    private readonly adopterService: AdopterService,
  ) {}

  @Post()
  createAdopter(@Body() body: CreateAdopterDto) {
    return this.adopterService.createAdopter(body);
  }

  @Get()
  getAllAdopters() {
    return this.adopterService.getAllAdopters();
  }

  @Get(':id')
  getAdopterById(@Param('id', ParseUUIDPipe) id: string) {
    return this.adopterService.getAdopterById(id);
  }

  @Patch(':id')
  updateAdopter(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateAdopterDto,
  ) {
    return this.adopterService.updateAdopter(
      id,
      body,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAdopter(@Param('id', ParseUUIDPipe) id: string) {
    return this.adopterService.deleteAdopter(id);
  }
}