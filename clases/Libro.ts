// En el archivo Libro.ts
import { Socio } from "./Socio";
import { Autor } from "./Autor";

/**
 * Representa un libro en la biblioteca con sus propiedades, gestión de reservas y autor como objeto.
 */
export class Libro {
  private _reservas: Socio[] = [];

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo(): string { return this._titulo; }
  get autor(): Autor { return this._autor; }
  get isbn(): string { return this._isbn; }

  get reservas(): Socio[] { return this._reservas; }

  /**
   * Agrega un socio a la cola de reservas.
   */
  agregarReserva(socio: Socio): void {
    if (!this._reservas.includes(socio)) {
      this._reservas.push(socio);
    }
  }

  /**
   * Quita y retorna el primer socio de la cola de reservas.
   */
  quitarPrimeraReserva(): Socio | undefined {
    return this._reservas.shift();
  }
}