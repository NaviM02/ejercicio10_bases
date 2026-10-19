import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from '../entidades/clase.entity.js';
import { Inscripcion } from '../entidades/inscripcion.entity.js';
import { ClasesController } from './clases.controller.js';
import { ClasesService } from './clases.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Clase, Inscripcion])],
  controllers: [ClasesController],
  providers: [ClasesService],
})
export class ClasesModule {}
