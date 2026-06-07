import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TagService } from './tag.service';
import type { Tag } from './entities/tag.entity';
import { CreateTagDto, TagSearchQueryDto } from './dto/tag-create.dto';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiBody({
    type: CreateTagDto,
  })
  @ApiCreatedResponse({
    description: 'Tag created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiConflictResponse({
    description: 'Tag already exists',
  })
  @Post()
  createTag(@Body() body: CreateTagDto) {
    return this.tagService.createTag(body);
  }

  @ApiOperation({
    summary: 'Get all tags',
  })
  @ApiOkResponse({
    description: 'Tags retrieved successfully',
  })
  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @ApiOperation({
    summary: 'Search tags',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Search term',
    example: 'friendly',
  })
  @ApiOkResponse({
    description: 'Matching tags retrieved successfully',
  })
  @Get('search')
  searchTags(@Query() query: TagSearchQueryDto): Promise<Tag[]> {
    return this.tagService.searchTags(query);
  }

  @ApiOperation({
    summary: 'Get tag by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Tag ID',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Tag found',
  })
  @ApiNotFoundResponse({
    description: 'Tag not found',
  })
  @Get(':id')
  getTagById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.getTagById(id);
  }

  @ApiOperation({
    summary: 'Delete a tag',
  })
  @ApiParam({
    name: 'id',
    description: 'Tag ID',
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Tag deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Tag not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }
}
