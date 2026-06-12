import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRole } from '../enums/user-role.enum';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('user')
export class User {
  @ApiProperty({
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'user@gmail.com',
  })
  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    select: false,
  })
  passwordHash!: string;

  @Column({
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshTokenHash!: string | null;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets!: Pet[];

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;
}
