import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity()
export class Tag {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Friendly',
  })
  @Column({
    unique: true,
  })
  name!: string;

  @ManyToMany(() => Pet, (pet) => pet.tags)
  @ApiPropertyOptional({
    type: () => Pet,
    isArray: true,
    description: 'Pets tagged with this tag',
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
