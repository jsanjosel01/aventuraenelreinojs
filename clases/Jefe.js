// Una subclase Jefe que herede de Enemigo

import { Enemigo } from './Enemigo.js'; 

export class Jefe extends Enemigo {
    constructor(nombre, avatar, nivelAtaque, puntosVida, multiplicadorDano) {
        super(nombre, avatar, nivelAtaque, puntosVida);
        this.multiplicadorDano = multiplicadorDano;
    }
}