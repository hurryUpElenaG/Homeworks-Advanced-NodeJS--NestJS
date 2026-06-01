import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;
}

export class TagSearchQueryDto{
  @IsOptional()
  @IsString()
  q?: string;
}