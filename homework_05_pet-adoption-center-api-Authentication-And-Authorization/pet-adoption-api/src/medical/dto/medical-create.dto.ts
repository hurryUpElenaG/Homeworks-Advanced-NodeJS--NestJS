import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class MedicalDto {
  @ApiProperty({
    description: 'Indicates whether the pet has received all required vaccinations',
    example: true,
  })
  @IsBoolean()
  vaccinated!: boolean;

  @ApiProperty({
    description: 'Indicates whether the pet has been neutered',
    example: true,
  })
  @IsBoolean()
  neutered!: boolean;

  @ApiPropertyOptional({
    description: 'Date of the pet’s most recent veterinary checkup',
    example: '2026-05-15',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  lastCheckup?: string;

  @ApiPropertyOptional({
    description: 'Additional medical notes about the pet',
    example: 'Requires a special diet and monthly allergy medication.',
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  notes?: string;
}