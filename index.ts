// En el archivo 'index.ts'

import { Biblioteca } from "./clases/Biblioteca";
const biblioteca = new Biblioteca();

// ... (El código de agregar libros y socios se mantiene igual)

biblioteca.agregarLibro("1984", "George Orwell", "1234567890");
biblioteca.agregarLibro("Cien Años de Soledad", "Gabriel García Márquez", "0987654321");
biblioteca.agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "1122334455");

biblioteca.registrarSocio("19224", "Enzo", "Pitana");
biblioteca.registrarSocio("29384", "Ana", "García");
biblioteca.registrarSocio("38475", "Luis", "Martínez");

// Simulación de un préstamo
console.log("\n--- Préstamo ---");
biblioteca.prestarLibro("1234567890", "19224"); // Enzo toma "1984"

// Intentar prestar el mismo libro a otro socio (debe reservarlo)
console.log("\n--- Intento de Préstamo con Reserva ---");
biblioteca.prestarLibro("1234567890", "29384"); // Ana intenta tomar "1984"
biblioteca.prestarLibro("1234567890", "38475"); // Luis intenta tomar "1984"

// Simulación de una devolución
console.log("\n--- Devolución ---");
biblioteca.devolverLibro("1234567890", "19224"); // Enzo devuelve "1984"