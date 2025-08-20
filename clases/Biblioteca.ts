// En el archivo 'Biblioteca.ts'

import { Libro } from './Libro';
import { Socio } from './Socio';

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];

    agregarLibro(titulo: string, autor: string, isbn: string): Libro {
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }
    
    registrarSocio(dni: string, nombre: string, apellido: string): Socio {
        const socio = new Socio(dni, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }

    // Nuevo método para prestar un libro
    prestarLibro(isbn: string, dniSocio: string): void {
        const libro = this.buscarLibro(isbn);
        const socio = this.socios.find(s => s.dni === dniSocio);

        if (!libro) {
            console.log(`Error: El libro con ISBN ${isbn} no se encuentra.`);
            return;
        }

        if (!socio) {
            console.log(`Error: El socio con DNI ${dniSocio} no está registrado.`);
            return;
        }

        if (libro.disponible) {
            libro.disponible = false;
            console.log(`¡Préstamo exitoso! "${libro.titulo}" ha sido prestado a ${socio.nombre}.`);
        } else {
            console.log(`El libro "${libro.titulo}" no está disponible.`);
            // Añadir al socio a la cola de reservas
            libro.agregarReserva(socio);
        }
    }

    // Nuevo método para devolver un libro
    devolverLibro(isbn: string, dniSocio: string): void {
        const libro = this.buscarLibro(isbn);
        const socio = this.socios.find(s => s.dni === dniSocio);

        if (!libro) {
            console.log(`Error: El libro con ISBN ${isbn} no se encuentra.`);
            return;
        }

        if (!socio) {
            console.log(`Error: El socio con DNI ${dniSocio} no está registrado.`);
            return;
        }
        
        // El libro vuelve a estar disponible
        libro.disponible = true;
        console.log(`¡Devolución exitosa! "${libro.titulo}" ha sido devuelto por ${socio.nombre}.`);

        // Comprobar si hay reservas
        if (libro.reservas.length > 0) {
            libro.notificarProximaReserva();
        }
    }
}