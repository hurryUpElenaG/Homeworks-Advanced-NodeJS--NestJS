import { IsUUID } from 'class-validator';
import { CreatePetDto } from './pet-create.dto';

export class PetDto extends CreatePetDto {
  @IsUUID('4')
  id!: string;
}