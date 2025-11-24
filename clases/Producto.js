// Clase Producto
import { formatCurrency  } from '../utils/utils.js';
import {TIPO_PRODUCTO} from '../utils/constants.js';

export default class Producto {
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

    // Aplica el bonus al jugador según el tipo de producto
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