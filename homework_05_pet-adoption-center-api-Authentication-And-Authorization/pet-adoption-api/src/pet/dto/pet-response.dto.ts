import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PetResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the pet',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4')
  id!: string;

  @ApiProperty({
    description: 'Pet name',
    example: 'Max',
  })
  name!: string;

  @ApiProperty({
    description: 'Pet species',
    example: 'Dog',
  })
  species!: string;

  @ApiProperty({
    description: 'Pet breed',
    example: 'Golden Retriever',
  })
  breed!: string;

  @ApiProperty({
    description: 'Age of the pet in years',
    example: 3,
  })
  age!: number;

  @ApiProperty({
    description: 'Current status of the pet',
    example: 'Available',
  })
  status!: string;

  @ApiProperty({
    description: 'Date when the pet record was created',
    example: '2026-06-06T12:00:00.000Z',
  })
  createdAt!: Date;


  @ApiPropertyOptional({
    description: 'Date when the pet record was last updated',
    example: '2026-06-07T15:30:00.000Z',
    nullable: true,
  })
  updatedAt!: Date | null;

  @ApiProperty({
    description: 'Shelter information',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Happy Tails Shelter',
      city: 'New York',
    },
  })
  shelter!: {
    id: string;
    name: string;
    city: string;
  };

  @ApiProperty({
    description: 'Medical information',
    example: {
      vaccinated: true,
      neutered: true,
      lastCheckup: '2026-05-15T00:00:00.000Z',
      notes: 'Healthy and active',
    },
  })
  medical!: {
    vaccinated: boolean;
    neutered: boolean;
    lastCheckup?: Date | null;
    notes?: string | null;
  };

  @ApiProperty({
    description: 'Tags assigned to the pet',
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Friendly',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'kind',
      },
    ],
  })
  tags!: {
    id: string;
    name: string;
  }[];

  @ApiPropertyOptional({
    description: 'Current active adoption information',
    nullable: true,
    example: {
      adopter: {
        id: '550e8400-e29b-41d4-a716-446655440004',
        fullName: 'Elena Georgievska',
      },
      adoptedAt: '2026-06-01T10:30:00.000Z',
    },
  })
  currentAdoption!: {
    adopter: {
      id: string;
      fullName: string;
    };
    adoptedAt: Date;
  } | null;
}