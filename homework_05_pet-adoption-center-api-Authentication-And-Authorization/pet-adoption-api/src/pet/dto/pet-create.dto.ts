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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Pet name',
    example: 'Max',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'Name can contain only letters, spaces, apostrophes, and hyphens',
  })
  name!: string;

  @ApiProperty({
    description: 'Species of the pet',
    enum: PetSpecies,
    example: PetSpecies.DOG,
  })
  @IsEnum(PetSpecies)
  species!: PetSpecies;

  @ApiProperty({
    description: 'Breed of the pet',
    example: 'Golden Retriever',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  breed!: string;

  @ApiProperty({
    description: 'Age of the pet in years',
    example: 3,
    minimum: 0,
    maximum: 40,
  })
  @IsInt()
  @Min(0)
  @Max(40)
  age!: number;

  @ApiProperty({
    description: 'ID of the shelter that currently owns the pet',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
  })
  @IsUUID()
  shelterId!: string;

  @ApiPropertyOptional({
    description: 'List of tag IDs associated with the pet',
    type: [String],
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440001'
    ],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  tagIds?: string[];

  @ApiProperty({
    description: 'Medical information for the pet',
    type: () => MedicalDto,
  })
  @ValidateNested()
  @Type(() => MedicalDto)
  medical!: MedicalDto;
}

export class QueryPetsDto extends PaginationDto{
  @ApiPropertyOptional({
    description: 'Search pets by name',
    example: 'Max',
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({
    description: 'Filter pets by species',
    enum: PetSpecies,
    example: PetSpecies.DOG,
  })
  @IsOptional()
  @IsEnum(PetSpecies)
  species?: PetSpecies;

  @ApiPropertyOptional({
    description: 'Filter pets belonging to a specific shelter',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  shelterId?: string;

  @ApiPropertyOptional({
    description: 'Filter pets adopted by a specific adopter',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID()
  adopterId?: string;

  @ApiPropertyOptional({
    description:
      'Filter pets by tags. Multiple tags can be provided as a comma-separated list.',
    example: 'friendly,kind',
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({
    description: 'Field used for sorting results',
    enum: PetSortByFields,
    default: PetSortByFields.createdAt,
    example: PetSortByFields.createdAt,
  })
  @IsOptional()
  @IsEnum(PetSortByFields)
  sortBy: PetSortByFields = PetSortByFields.createdAt;

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: SortDirection,
    default: SortDirection.DESC,
    example: SortDirection.DESC,
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.DESC;
}
