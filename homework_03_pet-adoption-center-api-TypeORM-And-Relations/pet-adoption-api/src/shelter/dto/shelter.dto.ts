import { IsUUID } from 'class-validator';

export class ShelterDto {
  @IsUUID('4')
  id!: string;
}