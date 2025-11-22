// Mercado

import Producto from '../clases/Producto.js';
import { RAREZA, TIPO_PRODUCTO} from '../utils/constants.js';

// Listado de los productos del mercado
const LISTA_PRODUCTOS_ORIGINAL = [

    new Producto("Espada", "img", 1200, RAREZA.RARA, TIPO_PRODUCTO.ARMA, 25), //FALTA PONER LAS IMG
    new Producto("Hacha", "img", 1500, RAREZA.LEGENDARIA, TIPO_PRODUCTO.ARMA, 40),
    new Producto("Armadura de Escamas", "img", 900, RAREZA.COMUN, TIPO_PRODUCTO.ARMADURA, 15),
    new Producto("Casco del Dragón", "img", 1000, RAREZA.RARA, TIPO_PRODUCTO.ARMADURA, 20),
    new Producto("Fruto de Dragón", "img", 50, RAREZA.COMUN, TIPO_PRODUCTO.CONSUMIBLE, 20),
    new Producto("Poción", "img", 80, RAREZA.LEGENDARIA, TIPO_PRODUCTO.CONSUMIBLE, 40),
   
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