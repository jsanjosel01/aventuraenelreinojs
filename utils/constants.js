// Constantes para el inventario, rareza y tipo de productos.

/**
 * @fileoverview Módulo que define las constantes clave utilizadas en el juego.
 * @exports RAREZA
 * @exports TIPO_PRODUCTO
 * @exports UMBRAL_VETERANO
 */

/**
 * Define las diferentes categorías de rareza para los productos del juego.
 * @readonly
 * @enum {string}
 */

export const RAREZA = {
    COMUN: "Común",
    RARA: "Rara",
    LEGENDARIA: "Legendaria"
};

/**
 * Define los tipos de producto que pueden existir en el inventario o mercado.
 * @readonly
 * @enum {string}
 */

export const TIPO_PRODUCTO = {
    ARMA: "Arma",
    ARMADURA: "Armadura",
    CONSUMIBLE: "Consumible"
};

/**
 * Puntuación mínima requerida para que un jugador sea clasificado como "Veterano".
 * @type {number}
 * @default 300
 */

export const UMBRAL_VETERANO = 300; // Así puedo modificarlo con fácilidad
