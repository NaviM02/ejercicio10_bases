import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ActualizarClaseDto } from './dto/actualizar-clase.dto.js';
import { CrearClaseConInscripcionDto } from './dto/crear-clase-con-inscripcion.dto.js';
import { CrearClaseDto } from './dto/crear-clase.dto.js';
import { ClasesService } from './clases.service.js';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clases: ClasesService) {}

  @Get()
  findAll() {
    return this.clases.findAll();
  }

  @Get('por-instructor')
  porInstructor(@Query('nombre') nombre: string) {
    return this.clases.porInstructor(nombre);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clases.findOne(id);
  }

  @Post()
  create(@Body() dto: CrearClaseDto) {
    return this.clases.create(dto);
  }

  @Post('con-inscripcion')
  crearConInscripcion(@Body() dto: CrearClaseConInscripcionDto) {
    return this.clases.crearClaseConInscripcion(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarClaseDto,
  ) {
    return this.clases.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clases.remove(id);
  }
}
