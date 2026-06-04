import {
  ArrayUnique,
  IsArray,
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
import { MedicalDto } from '../../medical/dto/medical-create.dto';
import { SortDirection } from '../../common/types/sort-direction';
import { PaginationDto } from '../../common/dto/pagination.dto';

export enum PetSpecies {
  DOG = 'Dog',
  CAT = 'Cat',
  RABBIT = 'Rabbit',
  BIRD = 'Bird',
  REPTILE = 'Reptile',
  OTHER = 'Other',
}

export enum PetSortByFields {
  age = 'age',
  name = 'name',
  species = 'species',
  breed = 'breed',
  createdAt = 'createdAt',
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

export class QueryPetsDto extends PaginationDto{
  @IsOptional()
  @IsString()
  query?: string;

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

  @IsOptional()
  @IsEnum(PetSortByFields)
  sortBy: PetSortByFields = PetSortByFields.createdAt;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.DESC;
}
