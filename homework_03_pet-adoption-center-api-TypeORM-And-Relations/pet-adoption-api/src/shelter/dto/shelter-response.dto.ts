import { IsUUID } from 'class-validator';

export class ShelterResponseDto {
  @IsUUID('4')
  id!: string;

  name!: string;
  city!: string;
  capacity!: number;

  pets!: {
    id: string;
    name: string;
    status: string;
  }[];
}