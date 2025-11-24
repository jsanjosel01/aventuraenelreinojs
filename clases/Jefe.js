// Una subclase Jefe que hereda de Enemigo
import { Enemigo } from './Enemigo.js'; 

export class Jefe extends Enemigo {
    constructor(nombre, avatar, nivelAtaque, puntosVida, multiplicadorDano = 1.2) { //Valor por defecto
        super(nombre, avatar, nivelAtaque, puntosVida);
        this.multiplicadorDano = multiplicadorDano;
    }
}