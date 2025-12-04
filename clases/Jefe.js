// Una subclase Jefe que hereda de Enemigo

/**
 * @fileoverview Subclase que representa a un enemigo de tipo Jefe.
 * @exports Jefe
 * @augments Enemigo
 */

import { Enemigo } from './Enemigo.js'; 

export class Jefe extends Enemigo {

    /**
     * Constructor para la clase Jefe. Hereda propiedades de Enemigo.
     * @param {string} nombre - Nombre del jefe.
     * @param {string} avatar - Ruta de la imagen del jefe.
     * @param {number} nivelAtaque - Valor de ataque base.
     * @param {number} puntosVida - Puntos de vida iniciales y máximos.
     * @param {number} [multiplicadorDano=1.2] - Multiplicador de daño adicional. Opcional.
     */
    
    constructor(nombre, avatar, nivelAtaque, puntosVida, multiplicadorDano = 1.2) { //Valor por defecto
        super(nombre, avatar, nivelAtaque, puntosVida);
        this.multiplicadorDano = multiplicadorDano;
    }
}