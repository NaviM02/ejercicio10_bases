import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entidades/clase.entity.js';
import { Inscripcion } from './entidades/inscripcion.entity.js';
import { Instructor } from './entidades/instructor.entity.js';
import { Miembro } from './entidades/miembro.entity.js';
import { ClasesModule } from './clases/clases.module.js';

try {
  process.loadEnvFile();
} catch {
  // .env es opcional: si no existe, se usan los valores por defecto.
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'practica7',
      entities: [Instructor, Clase, Miembro, Inscripcion],
      synchronize: true,
      logging: true,
    }),
    ClasesModule,
  ],
})
export class AppModule {}
