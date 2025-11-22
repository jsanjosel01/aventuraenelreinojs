// Clase Producto



import { formatCurrency  } from '../utils/utils.js';
export default class Producto {
    constructor(nombre, imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo; 
        this.bonus = bonus;
    }

    // FUNCIONES:

    // 1. Formatea atributos en función de las necesidades el precio "Ej: de 950 a 9,50€".
    formatearAtributos() {
        return formatCurrency(this.precio);
    }

   // 2. Aplicar un descuento, devuelve el producto clonado
    aplicarUnDescuento(valor) {

        const nuevoPrecio = this.precio - (this.precio * valor / 100);
        const clon = new Producto(
            this.nombre,
            this.imagen,
            Math.round(nuevoPrecio), 
            this.rareza,
            this.tipo,
            this.bonus
        );
        return clon;
    }
}