// Mercado

import Producto from '../clases/Producto.js';
import { RAREZA, TIPO_PRODUCTO} from '../utils/constants.js';

// Listado de los productos del mercado
const LISTA_PRODUCTOS_ORIGINAL = [

    new Producto("Flecha", "img/flecha.png", 1200, RAREZA.RARA, TIPO_PRODUCTO.ARMA, 25),
    new Producto("Hacha", "img/hacha.png", 1500, RAREZA.LEGENDARIA, TIPO_PRODUCTO.ARMA, 40),
    new Producto("Escudo", "img/escudo.png", 900, RAREZA.COMUN, TIPO_PRODUCTO.ARMA, 25),
    new Producto("Casco", "img/casco.png", 1000, RAREZA.RARA, TIPO_PRODUCTO.ARMA, 20),
    new Producto("Fruto de Dragón", "img/fruta.png", 50, RAREZA.COMUN, TIPO_PRODUCTO.ARMA, 20),
    new Producto("Poción", "img/pocion.png", 80, RAREZA.LEGENDARIA, TIPO_PRODUCTO.ARMA, 60),
   
];

// Buscar producto
export function getListaProductosOriginal() {
    return LISTA_PRODUCTOS_ORIGINAL.map(p => p); 
}

// Filtrar productos en función de la rareza.
export function filtrarProductos(rareza) {
    return LISTA_PRODUCTOS_ORIGINAL.filter(p => p.rareza === rareza);
}

// Funcion aplica el descuento, si coincide con la rareza o tipo
export function aplicarDescuentoPorCriterio(criterio, descuento) {

    return LISTA_PRODUCTOS_ORIGINAL.map(producto => {
        if (producto.rareza === criterio || producto.tipo === criterio) {
            return producto.aplicarUnDescuento(descuento); 
        }
        return producto;
    });
}