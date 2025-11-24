// Clase Jugador
import { TIPO_PRODUCTO } from "../utils/constants.js";

export default class Jugador {

    constructor(nombre, avatar, vidaInicial = 100) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];
        this.vida = vidaInicial; // Vida está a 100
        this.vidaMaxima = vidaInicial;
    }

    //Añadir un objeto al inventario
    añadirObjetoAlInventario(producto) {
        this.inventario.push(producto); //Se clona
    }

    //Sumar puntos al jugador cuando gane batallas.
    sumarPuntos(puntosGanados) {
        this.puntos += puntosGanados;
    }
    
    // Obtener Ataque
    obtenerAtaqueTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.ARMA)
            .reduce((total, item) => total + item.bonus, 0);
    }

    // Obtener Defensa
    obtenerDefensaTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.ARMADURA)
            .reduce((total, item) => total + item.bonus, 0);
    }
    
    // Obtener Vida
    obtenerVidaTotal() {
        const bonusConsumibles = this.inventario
            .filter(item => item.tipo === TIPO_PRODUCTO.CONSUMIBLE)
            .reduce((total, item) => total + item.bonus, 0);
        return this.vidaMaxima + bonusConsumibles;
    }

    // Curar vida
    curarVida() {
        this.vida = this.obtenerVidaTotal();
    }

    // Obtener todos los bonus del inventario a la jugadora
    aplicarBonusInventario() {
        this.inventario.forEach(item => item.aplicarBonus(this));
    }
}