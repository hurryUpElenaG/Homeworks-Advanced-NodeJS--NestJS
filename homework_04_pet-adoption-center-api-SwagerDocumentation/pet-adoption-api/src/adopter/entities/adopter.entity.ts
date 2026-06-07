import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adoption } from '../../adoption/entities/adoption.entity';

@Entity()
export class Adopter {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier of the adopter',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @Column()
  @ApiProperty({
    description: 'Full name of the adopter',
    example: 'Elena Georgievska',
  })
  fullName!: string;

  @Column({
    unique: true,
  })
  @ApiProperty({
    description: 'Unique email address of the adopter',
    example: 'elenag@example.com',
    format: 'email',
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ApiPropertyOptional({
    description: 'Phone number of the adopter',
    example: '+38970123456',
    nullable: true,
  })
  phone!: string | null;

  @OneToMany(() => Adoption, (adoption) => adoption.adopter)
  @ApiPropertyOptional({
    type: () => Adoption,
    isArray: true,
    description: 'Adoptions by this adopter',
  })
  adoptions!: Adoption[];

  @ApiProperty({
    description: 'Date when the adopter record was created',
    example: '2026-06-06T10:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiPropertyOptional({
    description: 'Date when the adopter record was last updated',
    example: '2026-06-07T15:30:00.000Z',
    nullable: true,
  })
  @UpdateDateColumn()
  updatedAt!: Date | null;

  @ApiPropertyOptional({
    description: 'Date when the adopter was soft deleted',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt!: Date | null;
}
