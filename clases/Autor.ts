// Archivo: Autor.ts
export class Autor {
  constructor(
    private _nombre: string,
    private _biografia: string,
    private _anoNacimiento: number
  ) {}

  get nombre(): string {
    return this._nombre;
  }
  
  get biografia(): string {
    return this._biografia;
  }
  
  get anoNacimiento(): number {
    return this._anoNacimiento;
  }
}