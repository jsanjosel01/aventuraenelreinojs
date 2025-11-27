import Jugador from './clases/Jugador.js';
import { Enemigo } from './clases/Enemigo.js';
import { Jefe } from './clases/Jefe.js';
import Producto from './clases/Producto.js';

import * as mercado from './model/mercado.js';

import { cambiarEscena } from './utils/utils.js';
import { combate } from './model/batalla.js';

let jugadoraActual = null;
let enemigos = [];
let productosdelMercado = []

let indiceBatalla = 0; //indice del combate

// Funcion Iniciar el juego, creacion de jugador + escena 1
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

     // Cargar lista de productos del mercado
    productosdelMercado = mercado.getListaProductosOriginal(); 
    
}


// Funcion vista jugador
function actualizarVistaJugador(sceneId) {
  if (!jugadoraActual) return;

    const ataque = jugadoraActual.obtenerAtaqueTotal();
    const defensa = jugadoraActual.obtenerDefensaTotal();
    const vida = jugadoraActual.obtenerVidaTotal();
    const puntos = jugadoraActual.puntos;

    // Actualizar stats 
    if (sceneId === 'scene-updated-stats') {
        document.getElementById('stat-attack-updated').textContent = ataque;
        document.getElementById('stat-defense-updated').textContent = defensa;
        document.getElementById('stat-life-updated').textContent = vida;
        document.getElementById('stat-points-updated').textContent = puntos;

        // Actualizar inventario
        const inventoryList = document.getElementById('inventory-list-updated');
        inventoryList.innerHTML = '';
        jugadoraActual.inventario.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} (+${producto.bonus} ${producto.tipo})`;
            inventoryList.appendChild(li);
        });
    }
}

// RENDERIZAR

// Función Renderizar productos en el mercado
function renderizarProductosMercado(productos) {
    const listContainer = document.getElementById('product-list');
    if (!listContainer) return;
    listContainer.innerHTML = ''; //Vacio

    productos.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.setAttribute('data-product-id', producto.nombre);

        const precioFormateado = producto.formatearAtributos();

        productElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:80px; height:80px; object-fit:contain;">
            <p><strong>${producto.nombre}</strong></p>
            <p style="font-size:0.8em;">+${producto.bonus} ${producto.tipo}</p>
            <p>${precioFormateado}</p>
            <button class="btn-add" style="cursor:pointer; background:gold; border:1px solid orange; padding:5px;">Añadir</button>
        `;

        listContainer.appendChild(productElement);
    });
}

// Funcion renderizar Enemigos
function renderizarEnemigos() {
    const listContainer = document.getElementById('enemy-selection-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (enemigos.length === 0) {
        listContainer.innerHTML = '<p>¡No hay enemigos disponibles!</p>';
        return;
    }

    enemigos.forEach(enemigo => {
        const enemyElement = document.createElement('div');
        enemyElement.classList.add('enemy-item');

        // Tipo: Enemigo o Jefe
        const tipo = enemigo instanceof Jefe ? 'Jefe' : 'Enemigo';

        //Pinta al enemigo
        enemyElement.innerHTML = `
            <img src="${enemigo.avatar}" alt="${enemigo.nombre}" style="width:100px; height:100px; object-fit:contain;">
            <p><strong>${enemigo.nombre}</strong></p>
            <p>${enemigo.nivelAtaque} puntos de ataque</p>

        `;
            //  <p><em>${tipo}</em></p> //Tipo de enemigo, si es jefe o enemigo
            //  <p>Vida: ${enemigo.puntosVida}</p> ESTO IRIA ARRIBA MOSTRAR LA VIDA
            // <button class="btn-fight-enemy" data-enemy-name="${enemigo.nombre}"  BOTON PARA ELEGIR A LOS ENEMIGOS
            // style="cursor:pointer; background:red; color:white; padding:5px;">Luchar</button>

        listContainer.appendChild(enemyElement);
    });
 
}

// Función para renderizar el inventario en la escena de batalla
function renderizarInventarioBatalla() {
    const inventarioContainer = document.getElementById('inventory-display-battle');
    if (!inventarioContainer) return;

    inventarioContainer.innerHTML = '<h4>Inventario del Combate:</h4>'; //MODIFICAR DESPUÉS

    if (jugadoraActual.inventario.length === 0) {
        inventarioContainer.innerHTML += '<p>No tienes objetos</p>';
        return;
    }

    const ul = document.createElement('ul');
    jugadoraActual.inventario.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} (+${producto.bonus} ${producto.tipo})`;
        ul.appendChild(li);
    });
    inventarioContainer.appendChild(ul);
}


// btn Añadir / Retirar Productos del Mercado
function handleToggleProducto(event) {
    const btn = event.target;

    // Solo reaccionar si es botón añadir o retirar
    if (!btn.classList.contains("btn-add") && !btn.classList.contains("btn-remove")) return;

    const productElement = btn.closest(".product-item");
    const nombreProducto = productElement.getAttribute("data-product-id");
    const productoOriginal = productosdelMercado.find(p => p.nombre === nombreProducto);

    if (!productoOriginal) return;

    if (btn.classList.contains("btn-add")) {
        // Cambiar botón a Retirar
        btn.textContent = "Retirar";
        btn.classList.replace("btn-add", "btn-remove");
        btn.style.background = "#fff";

        // Clonar producto usando el constructor para preservar métodos
        const productoClonado = new Producto(
            productoOriginal.nombre,
            productoOriginal.imagen,
            productoOriginal.precio,
            productoOriginal.rareza,
            productoOriginal.tipo,
            productoOriginal.bonus
        );

        // Añadir al inventario del jugador
        jugadoraActual.añadirObjetoAlInventario(productoClonado);

    } else if (btn.classList.contains("btn-remove")) {
        // Cambiar botón a Añadir
        btn.textContent = "Añadir";
        btn.classList.replace("btn-remove", "btn-add");
        btn.style.background = "gold"; //Amarrillo

        // Quitar del inventario por nombre
        jugadoraActual.inventario = jugadoraActual.inventario.filter(p => p.nombre !== nombreProducto);
    }

    // Actualizar estadísticas y mostrar inventario en escena 3
    actualizarVistaJugador('scene-updated-stats');
}

// Funcion iniciar las batallas/combates
function iniciarEscenaBatalla() {
    indiceBatalla = 0;
    mostrarBatalla(); // Llama a la primera batalla
}

// Función mostrar la batalla actual
function mostrarBatalla() {
    if (jugadoraActual.puntosVida <= 0) {
        renderizarEscenaFinal();
        cambiarEscena('scene-final');
        return;
    }

    // Sí no quedan enemigos
    if (indiceBatalla >= enemigos.length) {
        renderizarEscenaFinal();
        cambiarEscena('scene-final');
        return;
    }

    const enemigoActual = enemigos[indiceBatalla];
    cambiarEscena('scene-battle');

    // Ejecutar combate
    const resultado = combate(enemigoActual, jugadoraActual);

    // Actualizar UI de la Batalla
    document.getElementById('battle-player-life').textContent = resultado.vidaRestanteJugador; 
    document.getElementById('battle-enemy-name').textContent = enemigoActual.nombre;
    document.getElementById('battle-enemy-life').textContent = resultado.vidaRestanteEnemigo;

    // Llama al inventario
    renderizarInventarioBatalla();

    // Mostrar resultados de la batalla.
   let mensajeGanador = '';
    
    if (resultado.ganador === jugadoraActual.nombre) {
        mensajeGanador = `${jugadoraActual.nombre}`;
    } else {
        mensajeGanador = `${enemigoActual.nombre}`;
    }

    document.getElementById('battle-result').innerHTML = `
        <p><strong>Ganador:</strong> ${mensajeGanador}</p>
        <p><strong>Puntos ganados:</strong> ${resultado.puntos}</p>
    `;

    // btn "Continuar"
    indiceBatalla++; // Se incrementa el indice, para la siguiente combate
    const btnNextBattle = document.getElementById('btn-next-battle');
    
    // Sí la jugadora tiene vida:
    if (jugadoraActual.puntosVida > 0) {
        if (indiceBatalla < enemigos.length) {
            btnNextBattle.textContent = `Continuar las batallas ${indiceBatalla + 1}`;
            btnNextBattle.style.display = 'block';
        } else {
            btnNextBattle.textContent = 'Ver resultados';
            btnNextBattle.style.display = 'block';
        }
    } else {
        // Sí pierde
        btnNextBattle.textContent = 'Continuar';
        btnNextBattle.style.display = 'block';
    }

    // Actualiza la vista de estadísticas
    actualizarVistaJugador('scene-updated-stats');
}


// Eventos y listeners 
document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();

    // Botón iniciar aventura al Mercado (Escena 1 a la Escena 2)
    const btnStart = document.getElementById("btn-start-adventure");
    if (btnStart) {
        btnStart.addEventListener("click", () => {
            cambiarEscena("scene-market");
            renderizarProductosMercado(productosdelMercado);
        });
    }

    // btn Añadir/Retirar
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-add") || event.target.classList.contains("btn-remove")) {
            handleToggleProducto(event);
        }
    });

    // Continuar del mercado a escena 3 (stats)
    const btnMarketToStats = document.getElementById("btn-go-to-stats");
    if (btnMarketToStats) {
        btnMarketToStats.addEventListener("click", () => {
            actualizarVistaJugador('scene-updated-stats');
            cambiarEscena("scene-updated-stats");
        });
    }

    // Escena 3 a la Escena 4 (enemigos)
    const btnStatsToEnemies = document.getElementById("btn-go-to-enemies");
    if (btnStatsToEnemies) {
        btnStatsToEnemies.addEventListener("click", () => {
            cambiarEscena("scene-enemies");
            renderizarEnemigos();
        });
    }

    // Escena 4 a la Escena 5 (batalla)
    const btnEnemiesToBattle = document.getElementById("btn-continue-enemies");
    if (btnEnemiesToBattle) {
        btnEnemiesToBattle.addEventListener("click", () => {
            iniciarEscenaBatalla(); 
        });
    }

    // Escena 5 a la escena 6 
    const btnNextBattle = document.getElementById('btn-next-battle');
    if (btnNextBattle) {
        btnNextBattle.addEventListener('click', () => {

            // Comprueba si el jugador está vivo Y si quedan enemigos por luchar
            if (jugadoraActual.puntosVida > 0 && indiceBatalla < enemigos.length) {
                mostrarBatalla(); // Pasa a la siguiente batalla
            } else {
                renderizarEscenaFinal(); // Final del juego Escena6
                cambiarEscena("scene-final");
            }
        });
    }

    // Botón reiniciar juego
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.addEventListener('click', inicializarJuego);
});
