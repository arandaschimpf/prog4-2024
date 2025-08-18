import { Biblioteca } from "./clases/Biblioteca";
const biblioteca = new Biblioteca();

biblioteca.agregarLibro("1984", "George Orwell", "1234567890");
biblioteca.agregarLibro("Cien Años de Soledad", "Gabriel García Márquez", "0987654321");
biblioteca.agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "1122334455");
biblioteca.agregarLibro("La Sombra del Viento", "Carlos Ruiz Zafón", "6677889900");
biblioteca.agregarLibro("El Amor en los Tiempos del Cólera", "Gabriel García Márquez", "5544332211");

biblioteca.registrarSocio("19224", "Enzo", "Pitana");
biblioteca.registrarSocio("29384", "Ana", "García");
biblioteca.registrarSocio("38475", "Luis", "Martínez");

console.log("Libros en la biblioteca:");
console.log(biblioteca['inventario']); // Muestra el array de libros
console.log("Socios registrados:");
console.log(biblioteca['socios']); // Muestra el array de socios
console.log("¡Biblioteca creada y lista para usar!");
