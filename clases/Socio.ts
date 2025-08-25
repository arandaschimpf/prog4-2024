// En el archivo Socio.ts
import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";

/**
 * Representa un socio de la biblioteca.
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

  /**
   * Registra el préstamo de un libro al socio.
   */
  retirar(libro: Libro, duracion: number): void {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  /**
   * Devuelve un libro y lo quita de la lista de préstamos.
   */
  devolver(libro: Libro): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("El socio no tiene este libro prestado.");
    }

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasDeRetraso = Math.floor((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      const multa = diasDeRetraso * 50;
      this._deuda += multa;
      console.log(`⚠️ Libro "${libro.titulo}" devuelto con ${diasDeRetraso} días de retraso. Multa de $${multa}. Deuda total: $${this._deuda}`);
    } else {
      console.log(`✅ Devolución a tiempo. Sin multa.`);
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
    console.log(`📖 Libro "${libro.titulo}" añadido al historial de lectura de ${this.nombreCompleto}.`);
  }

  /**
   * Verifica si el socio tiene un libro prestado y retorna el préstamo si existe.
   */
  tienePrestadoLibro(libro: Libro): Prestamo | undefined {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }

  /**
   * Paga la deuda del socio.
   */
  saldarDeuda(): void {
    this._deuda = 0;
    console.log(`✅ Deuda de ${this.nombreCompleto} saldada. Deuda actual: $${this._deuda}`);
  }
}