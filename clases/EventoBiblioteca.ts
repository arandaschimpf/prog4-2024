// En el archivo EventoBiblioteca.ts
import { Socio } from "./Socio";

/**
 * Representa un evento de la biblioteca.
 */
export class EventoBiblioteca {
  private _participantes: Socio[] = [];

  constructor(
    private _nombre: string,
    private _fecha: Date,
    private _descripcion: string
  ) {}

  get nombre(): string {
    return this._nombre;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get participantes(): Socio[] {
    return this._participantes;
  }

  /**
   * Agrega un socio como participante del evento.
   */
  agregarParticipante(socio: Socio): void {
    if (!this._participantes.includes(socio)) {
      this._participantes.push(socio);
      console.log(`✅ Socio ${socio.nombreCompleto} se ha registrado en el evento "${this.nombre}".`);
    } else {
      console.log(`⚠️ El socio ${socio.nombreCompleto} ya está registrado en este evento.`);
    }
  }

  /**
   * Envía una notificación a todos los participantes.
   */
  notificarParticipantes(mensaje: string): void {
    console.log(`\n📢 Notificación del evento "${this.nombre}":`);
    this._participantes.forEach(socio => {
      console.log(`  -> ¡Hola, ${socio.nombreCompleto}! ${mensaje}`);
    });
  }
}