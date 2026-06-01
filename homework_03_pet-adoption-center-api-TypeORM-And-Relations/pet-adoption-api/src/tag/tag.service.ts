import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { Pet } from '../pet/entities/pet.entity';
import { CreateTagDto, TagSearchQueryDto } from './dto/tag-create.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async createTag(body: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: {
        name: ILike(body.name),
      },
    });

    if (existingTag) {
      throw new ConflictException(`Tag "${body.name}" already exists`);
    }

    const tag = this.tagRepository.create({
      name: body.name,
    });

    return this.tagRepository.save(tag);
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async searchTags(query: TagSearchQueryDto): Promise<Tag[]> {

    if (!query.q) {
      return this.tagRepository.find();
    }

    return this.tagRepository.find({
      where: {
        name: ILike(`%${query.q}%`),
      },
    });
  }

  async getTagById(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await this.getTagById(id);

    await this.tagRepository.remove(tag);
  }
}
