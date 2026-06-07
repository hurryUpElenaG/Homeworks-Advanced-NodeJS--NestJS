import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Pet } from '../../pet/entities/pet.entity';
import { Adopter } from '../../adopter/entities/adopter.entity';

@Entity()
export class Adoption {
  @ApiProperty({
    description: 'Unique identifier of the adoption record',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ type: () => Pet, description: 'Pet that was adopted' })
  @ManyToOne(() => Pet, (pet) => pet.adoptions)
  pet!: Pet;

  @ApiProperty({
    type: () => Adopter,
    description: 'Adopter who adopted the pet',
  })
  @ManyToOne(() => Adopter, (adopter) => adopter.adoptions)
  adopter!: Adopter;

  @ApiProperty({
    description: 'Date when the pet was adopted',
    example: '2026-06-01T10:30:00.000Z',
  })
  @Column()
  adoptedAt!: Date;

  @ApiPropertyOptional({
    description: 'Date when the pet was returned',
    example: '2026-06-15T14:20:00.000Z',
    nullable: true,
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  returnedAt!: Date | null;

  @ApiPropertyOptional({
    description: 'Additional notes about the adoption',
    example: 'Returned due to relocation.',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  notes!: string | null;

  @ApiProperty({
    description: 'Date when the adoption record was created',
    example: '2026-06-01T10:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt!: Date;
}
