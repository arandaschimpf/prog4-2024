// En el archivo Biblioteca.ts
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

/**
 * Representa una biblioteca que gestiona libros, socios, autores y eventos.
 */
export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private eventos: EventoBiblioteca[] = [];
  private DURACION = 14;

  // --- Métodos de gestión de autores ---
  agregarAutor(nombre: string, biografia: string, anoNacimiento: number): Autor {
    const autorCreado = new Autor(nombre, biografia, anoNacimiento);
    this.autores.push(autorCreado);
    return autorCreado;
  }

  buscarAutor(nombre: string): Autor | undefined {
    return this.autores.find(autor => autor.nombre === nombre);
  }

  // --- Métodos de gestión de libros ---
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | undefined {
    return this.inventario.find((libro) => libro.isbn === isbn);
  }

  buscarLibrosPorAutor(nombreAutor: string): Libro[] {
    const autorEncontrado = this.buscarAutor(nombreAutor);
    if (!autorEncontrado) {
      return [];
    }
    return this.inventario.filter(libro => libro.autor.nombre === nombreAutor);
  }

  // --- Métodos de gestión de socios ---
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | undefined {
    return this.socios.find((socio) => socio.id === id);
  }

  // --- Métodos de gestión de eventos ---
  crearEvento(nombre: string, fecha: Date, descripcion: string): EventoBiblioteca {
    const nuevoEvento = new EventoBiblioteca(nombre, fecha, descripcion);
    this.eventos.push(nuevoEvento);
    return nuevoEvento;
  }

  buscarEvento(nombre: string): EventoBiblioteca | undefined {
    return this.eventos.find(evento => evento.nombre === nombre);
  }

  registrarEnEvento(socioId: number, eventoNombre: string): void {
    const socio = this.buscarSocio(socioId);
    const evento = this.buscarEvento(eventoNombre);

    if (!socio) throw new Error("Socio no encontrado.");
    if (!evento) throw new Error("Evento no encontrado.");

    evento.agregarParticipante(socio);
  }

  // --- Operaciones de préstamos y reservas ---
  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio) throw new Error("Socio no encontrado.");
    if (!libro) throw new Error("Libro no encontrado.");

    if (socio.deuda > 0) {
      throw new Error(`❌ Error: ${socio.nombreCompleto} tiene una deuda pendiente de $${socio.deuda} y no puede retirar libros.`);
    }

    if (this.libroEstaPrestado(libro)) {
      throw new Error(`El libro "${libro.titulo}" no está disponible para préstamo.`);
    }

    socio.retirar(libro, this.DURACION);
    console.log(`✅ Préstamo exitoso: ${socio.nombreCompleto} ha retirado "${libro.titulo}".`);
  }

  devolverLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio) throw new Error("Socio no encontrado.");
    if (!libro) throw new Error("Libro no encontrado.");

    socio.devolver(libro);
    console.log(`✅ Devolución exitosa: ${socio.nombreCompleto} ha devuelto "${libro.titulo}".`);

    const siguienteSocio = libro.quitarPrimeraReserva();
    if (siguienteSocio) {
      console.log(`🔔 Notificación: ¡El libro "${libro.titulo}" ya está disponible para ${siguienteSocio.nombreCompleto}!`);
    }
  }

  reservarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio) throw new Error("Socio no encontrado.");
    if (!libro) throw new Error("Libro no encontrado.");

    if (this.libroEstaPrestado(libro)) {
      libro.agregarReserva(socio);
      console.log(`✅ Reserva exitosa: ${socio.nombreCompleto} ha reservado "${libro.titulo}".`);
    } else {
      console.log(`ℹ️ El libro "${libro.titulo}" está disponible. No es necesario reservarlo.`);
    }
  }

  // --- Método de recomendación ---
  sugerirLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) {
      console.log("❌ Socio no encontrado para recomendaciones.");
      return [];
    }

    const historial = socio.historialLectura;
    if (historial.length === 0) {
      console.log("ℹ️ No hay historial de lectura para hacer recomendaciones.");
      return [];
    }

    const recomendaciones: Libro[] = [];
    const autoresLeidos = new Set<Autor>();

    historial.forEach(libro => {
      autoresLeidos.add(libro.autor);
    });

    this.inventario.forEach(libroInventario => {
      if (autoresLeidos.has(libroInventario.autor) && !historial.includes(libroInventario)) {
        recomendaciones.push(libroInventario);
      }
    });

    return recomendaciones;
  }

  /** Verifica si el libro está prestado a cualquier socio. */
  private libroEstaPrestado(libro: Libro): boolean {
    return this.socios.some(socio => socio.tienePrestadoLibro(libro));
  }
}