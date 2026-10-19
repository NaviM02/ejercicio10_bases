import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Clase } from '../entidades/clase.entity.js';
import { Inscripcion } from '../entidades/inscripcion.entity.js';
import { ActualizarClaseDto } from './dto/actualizar-clase.dto.js';
import { CrearClaseConInscripcionDto } from './dto/crear-clase-con-inscripcion.dto.js';
import { CrearClaseDto } from './dto/crear-clase.dto.js';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private readonly repo: Repository<Clase>,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.repo.find({
      relations: { instructor: true, inscripciones: { miembro: true } },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const clase = await this.repo.findOne({
      where: { id },
      relations: { instructor: true, inscripciones: { miembro: true } },
    });

    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }

    return clase;
  }

  create(dto: CrearClaseDto) {
    const clase = this.repo.create({
      nombreClase: dto.nombreClase,
      horario: dto.horario ?? null,
      instructor: dto.instructorId ? { id: dto.instructorId } : null,
    } as DeepPartial<Clase>);

    return this.repo.save(clase);
  }

  async update(id: number, dto: ActualizarClaseDto) {
    const cambios: DeepPartial<Clase> = {};

    if (dto.nombreClase !== undefined) {
      cambios.nombreClase = dto.nombreClase;
    }

    if (dto.horario !== undefined) {
      cambios.horario = dto.horario;
    }

    if (dto.instructorId !== undefined) {
      cambios.instructor =
        dto.instructorId === null ? null : { id: dto.instructorId };
    }

    const clase = await this.repo.preload({ id, ...cambios });

    if (!clase) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }

    return this.repo.save(clase);
  }

  async remove(id: number) {
    const resultado = await this.repo.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException(`No existe la clase ${id}`);
    }

    return { eliminada: true };
  }

  porInstructor(nombre: string) {
    return this.repo
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.instructor', 'i')
      .where('i.nombre = :nombre', { nombre })
      .orderBy('c.nombre_clase', 'ASC')
      .getMany();
  }

  crearClaseConInscripcion(dto: CrearClaseConInscripcionDto) {
    return this.dataSource.transaction(async (manager) => {
      const clase = manager.create(Clase, {
        nombreClase: dto.nombreClase,
        horario: dto.horario ?? null,
        instructor: dto.instructorId ? { id: dto.instructorId } : null,
      } as DeepPartial<Clase>);

      await manager.save(clase);

      const inscripcion = manager.create(Inscripcion, {
        miembro: { id: dto.miembroId },
        clase: { id: clase.id },
        fechaInscripcion: new Date().toISOString().slice(0, 10),
      } as DeepPartial<Inscripcion>);

      await manager.save(inscripcion);

      return { clase, inscripcion };
    });
  }
}
