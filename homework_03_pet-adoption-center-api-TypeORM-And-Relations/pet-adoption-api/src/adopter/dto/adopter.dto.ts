import { IsUUID } from 'class-validator';

export class AdopterDto {
  @IsUUID('4')
  id!: string;
}