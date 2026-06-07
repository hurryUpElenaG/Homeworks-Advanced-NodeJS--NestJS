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
import { AdopterResponseDto } from './dto/adopter-response.dto';

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
} from '@nestjs/swagger';

@ApiTags('Adopter')
@Controller('adopter')
export class AdopterController {
  constructor(private readonly adopterService: AdopterService) {}

  @ApiOperation({
    summary: 'Create a new adopter',
    description: 'Creates a new adopter in the system.',
  })
  @ApiCreatedResponse({
    description: 'Adopter created successfully',
    type: AdopterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiConflictResponse({
    description: 'Adopter with this email already exists',
  })
  @Post()
  createAdopter(@Body() body: CreateAdopterDto) {
    return this.adopterService.createAdopter(body);
  }

  @ApiOperation({
    summary: 'Get all adopters',
    description: 'Returns a list of all adopters.',
  })
  @ApiOkResponse({
    description: 'Adopters retrieved successfully',
    type: [AdopterResponseDto],
  })
  @Get()
  getAllAdopters() {
    return this.adopterService.getAllAdopters();
  }

  @ApiOperation({
    summary: 'Get adopter by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Adopter ID',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Adopter found',
    type: AdopterResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Adopter not found',
  })
  @Get(':id')
  getAdopterById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AdopterResponseDto> {
    return this.adopterService.getAdopterResponseDtoById(id);
  }

  @ApiOperation({
    summary: 'Update an adopter',
    description: 'Partially updates an adopter.',
  })
  @ApiParam({
    name: 'id',
    description: 'Adopter ID',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Adopter updated successfully',
    type: AdopterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Adopter not found',
  })
  @Patch(':id')
  updateAdopter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAdopterDto,
  ) {
    return this.adopterService.updateAdopter(id, body);
  }

  @ApiOperation({
    summary: 'Delete an adopter',
    description: 'Soft deletes an adopter.',
  })
  @ApiParam({
    name: 'id',
    description: 'Adopter ID',
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Adopter deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Adopter not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAdopter(@Param('id', ParseUUIDPipe) id: string) {
    return this.adopterService.deleteAdopter(id);
  }
}
