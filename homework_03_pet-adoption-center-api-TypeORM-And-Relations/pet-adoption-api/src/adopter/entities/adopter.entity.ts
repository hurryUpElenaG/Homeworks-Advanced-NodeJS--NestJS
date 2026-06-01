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
  id!: string;

  @Column()
  fullName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone!: string | null;

  @OneToMany(() => Adoption, (adoption) => adoption.adopter)
  adoptions!: Adoption[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date | null;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
