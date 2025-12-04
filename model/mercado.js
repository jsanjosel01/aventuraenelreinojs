// Mercado
/**
 * @fileoverview Módulo que gestiona el listado estático de productos del mercado.
 * @exports getListaProductosOriginal
 * @exports filtrarProductos
 * @exports aplicarDescuentoPorCriterio
 */

import Producto from '../clases/Producto.js';
import { RAREZA, TIPO_PRODUCTO} from '../utils/constants.js';

// Listado de los productos del mercado

/**
 * Listado original y estático de todos los productos disponibles en el mercado.
 * @type {Array<Producto>}
 */

const LISTA_PRODUCTOS_ORIGINAL = [

    new Producto("Flecha", "img/flecha.png", 1200, RAREZA.RARA, TIPO_PRODUCTO.ARMA, 25),
    new Producto("Hacha", "img/hacha.png", 1500, RAREZA.LEGENDARIA, TIPO_PRODUCTO.ARMA, 40),
    new Producto("Escudo", "img/escudo.png", 900, RAREZA.COMUN, TIPO_PRODUCTO.ARMA, 25),
    new Producto("Casco", "img/casco.png", 1000, RAREZA.RARA, TIPO_PRODUCTO.ARMA, 20),
    new Producto("Fruto de Dragón", "img/fruta.png", 50, RAREZA.COMUN, TIPO_PRODUCTO.ARMA, 20),
    new Producto("Poción", "img/pocion.png", 80, RAREZA.LEGENDARIA, TIPO_PRODUCTO.ARMA, 60),
   
];

// Buscar producto

/**
 * Devuelve una copia (clon) de la lista original de productos.
 * @returns {Array<Producto>} Una copia de la lista completa de productos.
 */

export function getListaProductosOriginal() {
    return LISTA_PRODUCTOS_ORIGINAL.map(p => p); 
}

// Filtrar productos en función de la rareza.

/**
 * Filtra los productos del listado original en función de una rareza específica.
 * @param {RAREZA} rareza - El valor de rareza por el cual filtrar.
 * @returns {Array<Producto>} Un nuevo array con los productos que coinciden con la rareza.
 */

export function filtrarProductos(rareza) {
    return LISTA_PRODUCTOS_ORIGINAL.filter(p => p.rareza === rareza);
}

// Funcion aplica el descuento, si coincide con la rareza o tipo

/**
 * Aplica un descuento a los productos si su rareza o tipo coinciden con el criterio.
 * Devuelve un nuevo array de Productos con el precio actualizado.
 * @param {RAREZA|TIPO_PRODUCTO|string} criterio - El criterio de rareza o tipo a evaluar.
 * @param {number} descuento - El porcentaje de descuento a aplicar.
 * @returns {Array<Producto>} Un nuevo array de productos con los descuentos aplicados.
 */

export function aplicarDescuentoPorCriterio(criterio, descuento) {

    return LISTA_PRODUCTOS_ORIGINAL.map(producto => {
        if (producto.rareza === criterio || producto.tipo === criterio) {
            return producto.aplicarUnDescuento(descuento); 
        }
        return producto;
    });
}