import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity()
export class MedicalRecord {
  @ApiProperty({
    description: 'Unique identifier of the medical record',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Whether the pet is vaccinated',
    example: true,
  })
  @Column()
  vaccinated!: boolean;

  @ApiProperty({
    description: 'Whether the pet is neutered',
    example: true,
  })
  @Column()
  neutered!: boolean;

  @ApiPropertyOptional({
    description: 'Date of the last veterinary checkup',
    example: '2026-05-15T00:00:00.000Z',
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  lastCheckup?: Date;

  @ApiPropertyOptional({
    description: 'Additional medical notes',
    example: 'Requires allergy medication.',
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  notes?: string;

  @OneToOne(() => Pet, (pet) => pet.medical, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: () => Pet,
    description: 'The pet this medical record belongs to',
  })
  pet!: Pet;

  @ApiPropertyOptional({
    description: 'Soft deletion timestamp',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt!: Date | null;
}
