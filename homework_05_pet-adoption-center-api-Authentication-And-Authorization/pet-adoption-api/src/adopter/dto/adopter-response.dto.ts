import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AdopterResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4')
  id!: string;

  @ApiProperty({
    example: 'Elena Georgievska',
  })
  fullName!: string;

  @ApiProperty({
    example: 'elenag@example.com',
    format: 'email',
  })
  email!: string;

  @ApiPropertyOptional({
    example: '+38970123456',
    nullable: true,
  })
  phone!: string | null;

  @ApiProperty({
    description: 'Adoption history of the adopter',
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        adoptedAt: '2026-06-01T10:30:00.000Z',
        returnedAt: null,
        pet: {
          id: '550e8400-e29b-41d4-a716-446655440004',
          name: 'Elena',
        },
      },
    ],
  })
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