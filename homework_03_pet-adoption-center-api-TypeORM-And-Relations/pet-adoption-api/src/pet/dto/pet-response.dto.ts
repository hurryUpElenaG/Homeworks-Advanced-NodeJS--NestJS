import { IsUUID } from 'class-validator';

export class PetResponseDto {
  @IsUUID('4')
  id!: string;

  name!: string;
  species!: string;
  breed!: string;
  age!: number;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date | null;

  shelter!: {
    id: string;
    name: string;
    city: string;
  };

  medical!: {
    vaccinated: boolean;
    neutered: boolean;
    lastCheckup?: Date | null;
    notes?: string | null;
  };

  tags!: {
    id: string;
    name: string;
  }[];

  currentAdoption!: {
    adopter: {
      id: string;
      fullName: string;
    };
    adoptedAt: Date;
  } | null;
}