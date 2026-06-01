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

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@Body() body: CreateTagDto) {
    return this.tagService.createTag(body);
  }

  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @Get('search')
  searchTags(@Query() query: TagSearchQueryDto): Promise<Tag[]> {
    return this.tagService.searchTags(query);
  }

  @Get(':id')
  getTagById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.getTagById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }
}
