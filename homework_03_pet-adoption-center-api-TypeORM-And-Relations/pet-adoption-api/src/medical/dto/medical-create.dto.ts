import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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