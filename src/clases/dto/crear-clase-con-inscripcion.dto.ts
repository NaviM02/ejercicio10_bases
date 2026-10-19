export class CrearClaseConInscripcionDto {
  nombreClase!: string;
  horario?: string | null;
  instructorId?: number | null;
  miembroId!: number;
}
