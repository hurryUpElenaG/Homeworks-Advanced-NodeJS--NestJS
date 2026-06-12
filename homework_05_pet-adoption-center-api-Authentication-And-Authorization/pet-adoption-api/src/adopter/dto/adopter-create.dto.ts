import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAdopterDto {
  @ApiProperty({
    description: 'Full name of the adopter',
    example: 'Elena Georgievska',
    minLength: 2,
    maxLength: 80,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Matches(/^[A-Za-z\s'-]+$/)
  fullName!: string;

  @ApiProperty({
    description: 'Email address of the adopter',
    example: 'elenag@example.com',
    format: 'email',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'Contact phone number of the adopter',
    example: '+38970123456',
  })
  @IsOptional()
  @IsPhoneNumber()
  //@Matches(/^[+]?[0-9\s()-]{7,20}$/)   instead of IsPhoneNumber
  phone?: string;
}