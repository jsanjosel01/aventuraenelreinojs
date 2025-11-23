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
    actualizarVistaJugador();
    cambiarEscena('scene-start'); 

    // Botón para pasar a la escena del mercado
    document.getElementById("btn-start-adventure").addEventListener("click", () => {
        cambiarEscena("scene-market");
    });
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

// Función comenzar el juego, btn continuar
function handleStartAdventure() {
    // Cambia a la escena del Mercado
    cambiarEscena('scene-market');
}
document.getElementById("btn-start-adventure").addEventListener("click", handleStartAdventure);


// Escuchar eventos
document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego(); //Llamar a la función "comienza el juego"

    // Para pasar de escena 2 a escena 3
    const btnMarketToStats = document.getElementById("btn-go-to-stats");
    if (btnMarketToStats) {
        btnMarketToStats.addEventListener("click", () => {
            cambiarEscena("scene-updated-stats");
        });
    }
});