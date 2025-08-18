export class Socio {
    private _dni: string;
    private _nombre: string;
    private _apellido: string;

    constructor(dni: string, nombre: string, apellido: string) {
        this._dni = dni;
        this._nombre = nombre;
        this._apellido = apellido;
    }

    get dni(): string {
        return this._dni;
    }
    get nombre(): string {
        return this._nombre;
    }
    get apellido(): string {
        return this._apellido;
    }
}
