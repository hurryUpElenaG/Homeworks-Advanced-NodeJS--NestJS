import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateShelterDto {
  @ApiProperty({
    description: 'Name of the shelter',
    example: 'Happy Tails Shelter',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    description: 'City where the shelter is located',
    example: 'Skopje',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  city!: string;

  @ApiProperty({
    description: 'Maximum number of pets the shelter can accommodate',
    example: 100,
    minimum: 1,
    maximum: 1000,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  capacity!: number;
}