import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateShelterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  city!: string;

  @IsInt()
  @Min(1)
  @Max(1000)
  capacity!: number;
}