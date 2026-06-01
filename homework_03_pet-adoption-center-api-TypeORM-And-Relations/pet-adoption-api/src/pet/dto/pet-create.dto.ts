import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Matches,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export enum PetSpecies {
  DOG = 'Dog',
  CAT = 'Cat',
  RABBIT = 'Rabbit',
  BIRD = 'Bird',
  REPTILE = 'Reptile',
  OTHER = 'Other',
}

export class MedicalDto {
  @IsBoolean()
  vaccinated!: boolean;

  @IsBoolean()
  neutered!: boolean;

  @IsOptional()
  @IsDateString()
  lastCheckup?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  notes?: string;
}

export class CreatePetDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'Name can contain only letters, spaces, apostrophes, and hyphens',
  })
  name!: string;

  @IsEnum(PetSpecies)
  species!: PetSpecies;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  breed!: string;

  @IsInt()
  @Min(0)
  @Max(40)
  age!: number;

  @IsUUID()
  shelterId!: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  tagIds?: string[];

  @ValidateNested()
  @Type(() => MedicalDto)
  medical!: MedicalDto;
}

export class QueryPetsDto {
  @IsOptional()
  @IsEnum(PetSpecies)
  species?: PetSpecies;

  @IsOptional()
  @IsUUID()
  shelterId?: string;

  @IsOptional()
  @IsUUID()
  adopterId?: string;

  @IsOptional()
  @IsString()
  tags?: string;
}
