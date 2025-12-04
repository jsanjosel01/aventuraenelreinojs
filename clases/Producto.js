// Clase Producto

/**
 * @fileoverview Clase que define un Producto vendible o utilizable en el juego (Arma, Armadura, Consumible).
 * @exports default
 */

import { formatCurrency  } from '../utils/utils.js';
import {TIPO_PRODUCTO} from '../utils/constants.js';

export default class Producto {

    /**
     * Constructor para la clase Producto.
     * @param {string} nombre - Nombre del producto.
     * @param {string} imagen - Ruta de la imagen del producto.
     * @param {number} precio - Precio de compra o venta.
     * @param {string} rareza - La rareza del producto.
     * @param {TIPO_PRODUCTO} tipo - El tipo de producto (ARMA, ARMADURA, CONSUMIBLE).
     * @param {number} bonus - El valor de la estadística que modifica.
     * @throws {Error} Si el tipo de producto no es válido.
     */

    constructor(nombre, imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;

        // Validación usando la constante
        if (!Object.values(TIPO_PRODUCTO).includes(tipo)) {
            throw new Error(`Tipo inválido: ${tipo}. Tiene que ser Arma, Armadura o Consumible.`);
        }

        this.tipo = tipo; 
        this.bonus = bonus;
    }

    // FUNCIONES:
    // 1. Formatear el precio, "Ej: de 950 a 9,50€".

    /**
     * Formatea el precio numérico del producto a una cadena de texto de moneda.
     * @returns {string} El precio formateado.
     */

    formatearAtributos() {
        return formatCurrency(this.precio);
    }

   // 2. Aplicar un descuento, devuelve el producto clonado

   /**
     * Aplica un descuento al producto y devuelve un nuevo Producto (clon) con el precio actualizado.
     * @param {number} valor - El porcentaje de descuento a aplicar (ej: 10 para 10%).
     * @returns {Producto} Un nuevo Producto con el precio rebajado.
     */

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

    // Aplica el bonus al jugador según el tipo de producto

    /**
     * Aplica el bonus del producto a la estadística correspondiente del jugador.
     * @param {Jugador} jugador - La instancia del Jugador al que se le aplicará el bonus.
     */
    
    aplicarBonus(jugador) {
        switch(this.tipo) {
            case TIPO_PRODUCTO.ARMA:
                jugador.ataque += this.bonus;
                break;
            case TIPO_PRODUCTO.ARMADURA:
                jugador.defensa += this.bonus;
                break;
            case TIPO_PRODUCTO.CONSUMIBLE:
                jugador.vida += this.bonus;
                break;
        }
}
}