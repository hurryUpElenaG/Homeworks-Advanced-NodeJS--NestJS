import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shelter } from '../../shelter/entities/shelter.entity';
import { MedicalRecord } from '../../medical/entities/medical-record.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Adoption } from '../../adoption/entities/adoption.entity';

export enum PetStatus {
  AVAILABLE = 'available',
  ADOPTED = 'adopted',
}

export enum PetSpecies {
  DOG = 'Dog',
  CAT = 'Cat',
  RABBIT = 'Rabbit',
  BIRD = 'Bird',
  REPTILE = 'Reptile',
  OTHER = 'Other',
}

@Entity()
export class Pet {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Max',
  })
  @Column()
  name!: string;

  @ApiProperty({
    enum: PetSpecies,
    example: PetSpecies.DOG,
  })
  @Column({ type: 'enum', enum: PetSpecies })
  species!: PetSpecies;

  @ApiProperty({
    example: 'Golden Retriever',
  })
  @Column()
  breed!: string;

  @ApiProperty({
    example: 3,
  })
  @Column()
  age!: number;

  @Column({
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.AVAILABLE,
  })
  @Column({
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.AVAILABLE,
  })
  @ApiProperty({
    description: 'Current status of the pet',
    enum: PetStatus,
    example: PetStatus.AVAILABLE,
  })
  status!: PetStatus;

  // Many Pets -> One Shelter
  @ApiProperty({
    type: () => Shelter,
    description: 'Shelter that currently owns the pet',
  })
  @ManyToOne(() => Shelter, (shelter) => shelter.pets, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  shelter!: Shelter;

  // One Pet -> One Medical Record
  @ApiProperty({
    type: () => MedicalRecord,
    description: 'Medical record for the pet',
  })
  @OneToOne(() => MedicalRecord, (medical) => medical.pet, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  medical!: MedicalRecord;

  // Many Pets <-> Many Tags
  @ApiPropertyOptional({
    type: () => Tag,
    isArray: true,
    description: 'Tags assigned to the pet',
  })
  @ManyToMany(() => Tag, (tag) => tag.pets)
  @JoinTable({
    name: 'pet_tags',
  })
  tags!: Tag[];

  // One Pet -> Many Adoptions
  @ApiPropertyOptional({
    type: () => Adoption,
    isArray: true,
    description: 'Adoption history for the pet',
  })
  @OneToMany(() => Adoption, (adoption) => adoption.pet)
  adoptions!: Adoption[];

  @ApiProperty({
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    nullable: true,
  })
  @UpdateDateColumn()
  updatedAt!: Date | null;

  @ApiProperty({
    description: 'Soft deletion timestamp',
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt!: Date | null;
}
