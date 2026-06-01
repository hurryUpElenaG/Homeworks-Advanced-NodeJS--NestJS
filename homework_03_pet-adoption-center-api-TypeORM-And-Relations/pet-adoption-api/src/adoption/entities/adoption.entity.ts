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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Pet, (pet) => pet.adoptions)
  pet!: Pet;

  @ManyToOne(() => Adopter, (adopter) => adopter.adoptions)
  adopter!: Adopter;

  @Column()
  adoptedAt!: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  returnedAt!: Date | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}