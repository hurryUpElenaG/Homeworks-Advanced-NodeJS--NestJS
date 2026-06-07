import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShelterResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the shelter',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID('4')
  id!: string;

  @ApiProperty({
    description: 'Shelter name',
    example: 'Happy Tails Shelter',
  })
  name!: string;

  @ApiProperty({
    description: 'City where the shelter is located',
    example: 'Skopje',
  })
  city!: string;

  @ApiProperty({
    description: 'Maximum shelter capacity',
    example: 100,
  })
  capacity!: number;

  @ApiProperty({
    description: 'Pets currently assigned to the shelter',
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Buddy',
        status: 'Available',
      },
    ],
  })
  pets!: {
    id: string;
    name: string;
    status: string;
  }[];
}
