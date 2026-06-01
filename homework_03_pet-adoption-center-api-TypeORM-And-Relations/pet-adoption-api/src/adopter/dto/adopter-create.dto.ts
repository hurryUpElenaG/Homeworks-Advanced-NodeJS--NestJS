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
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Matches(/^[A-Za-z\s'-]+$/)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsPhoneNumber()
  //@Matches(/^[+]?[0-9\s()-]{7,20}$/)   instead of IsPhoneNumber
  phone?: string;
}