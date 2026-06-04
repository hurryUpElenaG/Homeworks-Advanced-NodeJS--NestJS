import { Column, Entity, OneToOne, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  vaccinated!: boolean;

  @Column()
  neutered!: boolean;

  @Column({
    nullable: true,
  })
  lastCheckup?: Date;

  @Column({
    nullable: true,
  })
  notes?: string;

  @OneToOne(() => Pet, (pet) => pet.medical, {
    onDelete: 'CASCADE',
  })
  pet!: Pet;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
