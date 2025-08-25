// En el archivo Prestamo.ts
import { Libro } from "./Libro";

/**
 * Representa un préstamo de un libro a un socio.
 */
export class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}