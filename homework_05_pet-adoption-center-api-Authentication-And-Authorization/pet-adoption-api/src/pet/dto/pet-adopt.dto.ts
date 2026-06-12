import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AdoptPetDto {
  @ApiProperty({
    description: 'Unique identifier of the adopter who is adopting the pet',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID('4')
  adopterId!: string;
}