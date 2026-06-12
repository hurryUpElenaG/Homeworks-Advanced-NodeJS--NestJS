import { PartialType } from '@nestjs/mapped-types';
import { CreateShelterDto } from './shelter-create.dto';

export class UpdateShelterDto extends PartialType(CreateShelterDto) {}