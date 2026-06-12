import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity()
export class Shelter {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Happy Tails Shelter',
  })
  @Column()
  name!: string;

  @ApiProperty({
    example: 'Skopje',
  })
  @Column()
  city!: string;

  @ApiProperty({
    example: 100,
  })
  @Column()
  capacity!: number;

  @OneToMany(() => Pet, (pet) => pet.shelter)
  @ApiPropertyOptional({
    type: () => Pet,
    isArray: true,
    description: 'Pets currently in the shelter',
  })
  pets!: Pet[];

  @ApiProperty({
    example: '2026-06-06T12:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiPropertyOptional({
    example: '2026-06-07T10:00:00.000Z',
    nullable: true,
  })
  @UpdateDateColumn()
  updatedAt!: Date | null;
}
