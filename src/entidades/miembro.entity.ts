import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Inscripcion } from './inscripcion.entity.js';

@Entity({ name: 'miembro' })
export class Miembro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({
    name: 'fecha_registro',
    type: 'date',
    nullable: true,
    default: () => 'CURRENT_DATE',
  })
  fechaRegistro!: string | null;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.miembro)
  inscripciones!: Relation<Inscripcion[]>;
}
