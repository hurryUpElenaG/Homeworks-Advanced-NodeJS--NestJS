import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './pet-create.dto';

export class PartiallyUpdatePetDto extends PartialType(CreatePetDto) {}