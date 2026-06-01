import { IsUUID } from 'class-validator';

export class AdoptPetDto {
  @IsUUID('4')
  adopterId!: string;
}