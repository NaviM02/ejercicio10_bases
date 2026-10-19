import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Clase } from './clase.entity.js';

@Entity({ name: 'instructor' })
export class Instructor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'especialidad', type: 'varchar', length: 50, nullable: true })
  especialidad!: string | null;

  @OneToMany(() => Clase, (clase) => clase.instructor)
  clases!: Relation<Clase[]>;
}
