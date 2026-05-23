import { Type } from 'class-transformer';

import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export enum PetSpecies {
  DOG = 'Dog',
  CAT = 'Cat',
  RABBIT = 'Rabbit',
  BIRD = 'Bird',
  REPTILE = 'Reptile',
  OTHER = 'Other',
}

export enum PetStatus {
  AVAILABLE = 'available',
  ADOPTED = 'adopted',
}

export class MedicalDto {
  @IsBoolean()
  vaccinated!: boolean;

  @IsBoolean()
  neutered!: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastCheckup?: Date;

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
    message:
      'Name can contain only letters, spaces, apostrophes, and hyphens',
  })
  name!: string;

  //@IsString()
  //@IsIn([`Dog`, `Cat`, `Rabbit`, `Bird`, `Reptile`, `Other`])
  @IsEnum(PetSpecies)
  species!: PetSpecies;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  breed!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(40)
  age!: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(20, { each: true })
  tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => MedicalDto)
  medical?: MedicalDto;

  //@IsOptional()
  @IsEnum(PetStatus)
  status: PetStatus = PetStatus.AVAILABLE;
}
