import Jugador from './clases/Jugador.js';
import { Enemigo } from './clases/Enemigo.js';
import { Jefe } from './clases/Jefe.js';
// PRODUCTO

import { cambiarEscena } from './utils/utils.js';

let jugadoraActual = null;
let enemigos = [];
// let productosdelMercado = []

function inicializarJuego() {
    // 1. Crear jugadora
    jugadoraActual = new Jugador("Vikinga", "img/v5.jpg");

    // 2. Crear enemigos
    enemigos = [
        new Enemigo("Fireworn", "img/d3.jpg", 8, 30),
        new Enemigo("Sreaming Death", "img/d4.jpg", 9, 35),
        new Jefe("Death song", "img/d2.jpg", 15, 80),
        new Jefe("Hideous Zippleback", "img/d8.jpg", 20, 100)
    ];


    // Mostrar la ESCENA 1.
    actualizarVistaJugador('scene-start');
    cambiarEscena('scene-start'); 
}

// Funcion vista jugador
function actualizarVistaJugador(sceneId) {
    const ataque = jugadoraActual.obtenerAtaqueTotal();
    const defensa = jugadoraActual.obtenerDefensaTotal();
    const vida = jugadoraActual.obtenerVidaTotal();

    const statsContainer = document.querySelector(`#${sceneId} .stats-grid`);
    if (statsContainer) {
        statsContainer.querySelector('[data-stat="attack"]').textContent = ataque;
        statsContainer.querySelector('[data-stat="defense"]').textContent = defensa;
        statsContainer.querySelector('[data-stat="life"]').textContent = jugadoraActual.vida;
        statsContainer.querySelector('[data-stat="points"]').textContent = jugadoraActual.puntos;
    }
    
}