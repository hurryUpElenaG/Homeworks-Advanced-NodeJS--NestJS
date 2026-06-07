import { PartialType } from '@nestjs/mapped-types';
import { CreateAdopterDto } from './adopter-create.dto';

export class UpdateAdopterDto extends PartialType(
  CreateAdopterDto,
) {}