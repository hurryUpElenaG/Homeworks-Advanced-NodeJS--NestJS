import { IsUUID } from 'class-validator';

export class AdopterResponseDto {
  @IsUUID('4')
  id!: string;
  fullName!: string;
  email!: string;
  phone!: string | null;

  adoptions!: {
    id: string;
    adoptedAt: Date;
    returnedAt: Date | null;
    pet: {
      id: string;
      name: string;
    };
  }[];
}