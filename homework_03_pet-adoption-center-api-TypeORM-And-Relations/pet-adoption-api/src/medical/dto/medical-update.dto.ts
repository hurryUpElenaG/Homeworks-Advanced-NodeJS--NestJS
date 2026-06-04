import { PartialType } from '@nestjs/mapped-types';
import { MedicalDto } from './medical-create.dto';

export class UpdateMedicalDto extends PartialType(MedicalDto) {}
