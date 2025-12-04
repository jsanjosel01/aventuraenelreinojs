// Clase Enemigo

/**
 * @fileoverview Clase que representa a una entidad Enemiga en el juego.
 * @exports Enemigo
 */

export class Enemigo {

    /**
     * Constructor para la clase Enemigo.
     * @param {string} nombre - Nombre del enemigo.
     * @param {string} avatar - Ruta de la imagen del enemigo.
     * @param {number} nivelAtaque - Valor de ataque.
     * @param {number} puntosVida - Puntos de vida iniciales y actuales.
     */
    
    constructor(nombre, avatar, nivelAtaque, puntosVida, dinero) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.nivelAtaque = nivelAtaque;
        this.puntosVida = puntosVida;
        this.vidaInicial = puntosVida;
        
        this.dinero = dinero;
    }
}