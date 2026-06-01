import { IsUUID } from 'class-validator';

export class TagDto {
  @IsUUID('4')
  id!: string;
}