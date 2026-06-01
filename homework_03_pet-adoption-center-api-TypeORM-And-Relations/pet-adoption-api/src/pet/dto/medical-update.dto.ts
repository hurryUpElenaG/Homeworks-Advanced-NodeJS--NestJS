import { PartialType } from '@nestjs/mapped-types';
import { MedicalDto } from './pet-create.dto';

export class UpdateMedicalDto extends PartialType(MedicalDto) {}
