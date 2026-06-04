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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: PetSpecies })
  species!: PetSpecies;

  @Column()
  breed!: string;

  @Column()
  age!: number;

  @Column({
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.AVAILABLE,
  })
  status!: PetStatus;

  // Many Pets -> One Shelter
  @ManyToOne(() => Shelter, (shelter) => shelter.pets, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  shelter!: Shelter;

  // One Pet -> One Medical Record
  @OneToOne(() => MedicalRecord, (medical) => medical.pet, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  medical!: MedicalRecord;

  // Many Pets <-> Many Tags
  @ManyToMany(() => Tag, (tag) => tag.pets)
  @JoinTable({
    name: 'pet_tags',
  })
  tags!: Tag[];

  // One Pet -> Many Adoptions
  @OneToMany(() => Adoption, (adoption) => adoption.pet)
  adoptions!: Adoption[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date | null;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
