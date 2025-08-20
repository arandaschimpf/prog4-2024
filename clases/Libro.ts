// En el archivo 'Libro.ts'

import { Socio } from "./Socio";

export class Libro {
    private _titulo: string;
    private _autor: string;
    private _isbn: string;
    private _disponible: boolean = true; // Por defecto, el libro está disponible
    private _reservas: Socio[] = []; // Cola de reservas

    constructor(titulo: string, autor: string, isbn: string) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
    }

    get titulo(): string {
        return this._titulo;
    }

    get autor(): string {
        return this._autor;
    }

    get isbn(): string {
        return this._isbn;
    }

    get disponible(): boolean {
        return this._disponible;
    }

    set disponible(estado: boolean) {
        this._disponible = estado;
    }

    get reservas(): Socio[] {
        return this._reservas;
    }

    // Método para agregar un socio a la cola de reservas
    agregarReserva(socio: Socio): void {
        this._reservas.push(socio);
        console.log(`¡${socio.nombre} ha reservado "${this.titulo}"!`);
    }

    // Método para notificar y quitar al primer socio de la cola
    notificarProximaReserva(): Socio | undefined {
        if (this._reservas.length > 0) {
            const socioReservado = this._reservas.shift(); // .shift() elimina y devuelve el primer elemento
            if (socioReservado) {
                console.log(`¡Notificación para ${socioReservado.nombre}! El libro "${this.titulo}" ya está disponible.`);
            }
            return socioReservado;
        }
        return undefined;
    }
}