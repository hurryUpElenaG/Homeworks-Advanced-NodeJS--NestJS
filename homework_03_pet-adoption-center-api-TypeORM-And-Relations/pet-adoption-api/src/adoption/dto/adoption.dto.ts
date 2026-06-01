import { IsUUID } from 'class-validator';

export class AdoptionDto {
  @IsUUID('4')
  id!: string;
}

