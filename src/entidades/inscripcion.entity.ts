import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Clase } from './clase.entity.js';
import { Miembro } from './miembro.entity.js';

@Entity({ name: 'inscripcion' })
export class Inscripcion {
  @PrimaryColumn({ name: 'miembro_id', type: 'int' })
  miembroId!: number;

  @PrimaryColumn({ name: 'clase_id', type: 'int' })
  claseId!: number;

  @Column({
    name: 'fecha_inscripcion',
    type: 'date',
    nullable: true,
    default: () => 'CURRENT_DATE',
  })
  fechaInscripcion!: string | null;

  @ManyToOne(() => Miembro, (miembro) => miembro.inscripciones, {
    nullable: false,
  })
  @JoinColumn({
    name: 'miembro_id',
    foreignKeyConstraintName: 'inscripcion_miembro_id_fkey',
  })
  miembro!: Relation<Miembro>;

  @ManyToOne(() => Clase, (clase) => clase.inscripciones, { nullable: false })
  @JoinColumn({
    name: 'clase_id',
    foreignKeyConstraintName: 'inscripcion_clase_id_fkey',
  })
  clase!: Relation<Clase>;
}
