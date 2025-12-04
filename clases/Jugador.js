// Clase Jugador

/**
 * @fileoverview Clase que representa al jugador principal del juego, gestionando sus estadísticas e inventario.
 * @exports default
 */

import { TIPO_PRODUCTO } from "../utils/constants.js";

export default class Jugador {

    /**
     * Constructor para la clase Jugador.
     * @param {string} nombre - El nombre del jugador.
     * @param {string} avatar - La ruta del archivo de imagen (avatar) del jugador.
     * @param {number} [vidaInicial=100] - Puntos de vida iniciales y máximos por defecto.
     */

    constructor(nombre, avatar, vidaInicial = 100) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];
        this.vida = vidaInicial; // Vida está a 100
        this.vidaMaxima = vidaInicial;
        
        this.puntosVida = vidaInicial;
    
        this.dinero=500;
    }

    //Añadir un objeto al inventario

    /**
     * Añade un objeto (Producto) al inventario del jugador.
     * @param {Producto} producto - La instancia de Producto a añadir.
     */

    añadirObjetoAlInventario(producto) {
        this.inventario.push(producto); //Se clona
    }

    //Sumar puntos al jugador cuando gane batallas.

    /**
     * Suma puntos a la puntuación total del jugador.
     * @param {number} puntosGanados - Cantidad de puntos a sumar.
     */

    sumarPuntos(puntosGanados) {
        this.puntos += puntosGanados;
    }
    
    // Obtener Ataque

    /**
     * Calcula el bonus total de ataque sumando el valor de los Productos de tipo ARMA.
     * @returns {number} El valor total de ataque.
     */

    obtenerAtaqueTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.ARMA)
            .reduce((total, item) => total + item.bonus, 0);
    }

    // Obtener Defensa

    /**
     * Calcula el bonus total de defensa sumando el valor de los Productos de tipo ARMADURA.
     * @returns {number} El valor total de defensa.
     */

    obtenerDefensaTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.ARMADURA)
            .reduce((total, item) => total + item.bonus, 0);
    }
    
    // Obtener Vida

    /**
     * Calcula la vida máxima efectiva del jugador, incluyendo el bonus de los Productos de tipo CONSUMIBLE.
     * @returns {number} El valor de la vida máxima total.
     */

    obtenerVidaTotal() {
        const bonusConsumibles = this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.CONSUMIBLE)
            .reduce((total, item) => total + item.bonus, 0);
        return this.vidaMaxima + bonusConsumibles;
    }

    // Curar vida

    /**
     * Restaura la vida actual del jugador a su vida máxima efectiva (incluyendo bonus).
     */

    curarVida() {
        this.vida = this.obtenerVidaTotal();
    }

    // Obtener todos los bonus del inventario a la jugadora

    /**
     * Itera sobre el inventario para aplicar los bonus permanentes de cada ítem al jugador.
     * @deprecated Considerar si esta función sigue siendo necesaria dado que el ataque y la defensa se calculan dinámicamente.
     */
    
    aplicarBonusInventario() {
        this.inventario.forEach(item => item.aplicarBonus(this));
    }
}