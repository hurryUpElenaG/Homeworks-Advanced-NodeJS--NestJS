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
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Tag')
@ApiBearerAuth('JWT')
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
  @ApiForbiddenResponse({
    description: 'Admin role required',
  })
  @Roles(UserRole.ADMIN)
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
  @ApiForbiddenResponse({
    description: 'Admin role required',
  })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }
}
