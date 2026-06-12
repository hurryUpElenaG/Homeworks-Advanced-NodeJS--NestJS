import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Name of the tag',
    example: 'Friendly',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;
}

export class TagSearchQueryDto{
  @ApiPropertyOptional({
    description: 'Search tags by name',
    example: 'friendly',
  })
  @IsOptional()
  @IsString()
  q?: string;
}