import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Instructor } from './instructor.entity.js';
import { Inscripcion } from './inscripcion.entity.js';

@Entity({ name: 'clase' })
export class Clase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre_clase', type: 'varchar', length: 100 })
  nombreClase!: string;

  @Column({ name: 'horario', type: 'varchar', length: 50, nullable: true })
  horario!: string | null;

  @ManyToOne(() => Instructor, (instructor) => instructor.clases, {
    nullable: true,
  })
  @JoinColumn({
    name: 'instructor_id',
    foreignKeyConstraintName: 'clase_instructor_id_fkey',
  })
  instructor!: Relation<Instructor> | null;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.clase)
  inscripciones!: Relation<Inscripcion[]>;
}
