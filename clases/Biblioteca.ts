import { Libro } from './Libro';
import { Socio } from './Socio';

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];

    agregarLibro(titulo: string, autor: string, isbn: string){
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
}

export const biblioteca = new Biblioteca();
