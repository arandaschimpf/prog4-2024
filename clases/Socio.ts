// Archivo: Socio.ts
import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";

/**
 * Cada socio de la biblioteca con su historial y estado
 */
export class Socio {
  private prestamos: Prestamo[] = [];
  private _deuda: number = 0;
  private _historialLectura: Libro[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get apellido(): string { return this._apellido; }
  get nombreCompleto(): string { return `${this.nombre} ${this.apellido}`; }
  get deuda(): number { return this._deuda; }
  get historialLectura(): Libro[] { return this._historialLectura; }

  // Cuando se lleva un libro prestado
  retirar(libro: Libro, duracion: number): void {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  // Cuando devuelve un libro
  devolver(libro: Libro): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("Este libro no está en tu lista de préstamos");
    }

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasDeRetraso = Math.floor((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      const multa = diasDeRetraso * 50;
      this._deuda += multa;
      console.log(`Ups! "${libro.titulo}" se entregó ${diasDeRetraso} días tarde. Eso suma $${multa} a tu cuenta. Tu deuda total ahora es de $${this._deuda}. ¡La próxima tratá de devolverlo a tiempo!`);
    } else {
      console.log(`¡Perfecto! Lo devolviste a tiempo. Sin multas ni problemas.`);
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
    console.log(`"${libro.titulo}" se agregó a tu historial de lectura, ${this.nombreCompleto}. ¡Qué bueno que hayas disfrutado otro libro!`);
  }

  // Verificamos si tiene prestado un libro específico
  tienePrestadoLibro(libro: Libro): Prestamo | undefined {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }

  // Pagar las deudas pendientes
  saldarDeuda(): void {
    this._deuda = 0;
    console.log(`¡Genial ${this.nombreCompleto}! Tu deuda está saldada. Ya podés llevarte libros de nuevo sin problemas.`);
  }
}