import Jugador from './clases/Jugador.js';
import { Enemigo } from './clases/Enemigo.js';
import { Jefe } from './clases/Jefe.js';
import Producto from './clases/Producto.js';

import * as mercado from './model/mercado.js';

import { cambiarEscena } from './utils/utils.js';
import { combate } from './model/batalla.js';
import { distinguirJugador } from './model/ranking.js';

let jugadoraActual = null;
let enemigos = [];
let productosdelMercado = []

let indiceBatalla = 0; //indice del combate

// Funcion Iniciar el juego, creacion de jugador + escena 1

function inicializarJuego() {
    // 1. Crear jugadora
    jugadoraActual = new Jugador("Vikinga", "img/astrid.png");

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

    // Obtención de Estadísticas 
    const ataque = jugadoraActual.obtenerAtaqueTotal();
    const defensa = jugadoraActual.obtenerDefensaTotal();
    const vida = jugadoraActual.obtenerVidaTotal();
    const puntos = jugadoraActual.puntos;

    // La vista se actualiza si estamos en la escena de stats O en el mercado.
    if (sceneId === 'scene-updated-stats' || sceneId === 'scene-market') { 
        
        // Actualizar Stats (si los elementos HTML existen)
        if (document.getElementById('stat-attack-updated')) {
             document.getElementById('stat-attack-updated').textContent = ataque;
             document.getElementById('stat-defense-updated').textContent = defensa;
             document.getElementById('stat-life-updated').textContent = vida;
             document.getElementById('stat-points-updated').textContent = puntos;
        }

        //Actualizar Inventario
        let inventoryListId; // Determinar qué ID
        
        if (sceneId === 'scene-updated-stats') {
             // ID específico de la Escena 3 (Estadísticas)
             inventoryListId = 'inventory-list-stats'; 
        } else if (sceneId === 'scene-market') {
             // ID específico de la Escena 2 (Mercado)
             inventoryListId = 'inventory-list-updated'; 
        }

        // Buscar el contenedor
        const inventoryContainer = document.getElementById(inventoryListId);

        if (inventoryContainer) { 
            inventoryContainer.innerHTML = ''; // Limpiar la lista
            
            // Recorrer el inventario del jugador y crear las casillas
            jugadoraActual.inventario.forEach(producto => {
                
                // Crear el DIV individual
                const itemSlot = document.createElement('div');
                // Usamos la clase .item para aplicar el CSS de la cuadrícula unificada
                itemSlot.classList.add('item'); 
                
                // Crear la imagen
                const img = document.createElement('img');
                img.src = producto.imagen; 
                img.alt = producto.nombre;
                
                // Adjuntar la imagen a la casilla
                itemSlot.appendChild(img);
                
                // Adjuntar la casilla al contenedor
                inventoryContainer.appendChild(itemSlot);
            });
        }
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
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <p><strong>${producto.nombre}</strong></p>
            <p style="font-size:0.8em;">+${producto.bonus} ${producto.tipo}</p>
            <p>${precioFormateado}</p>
            <button class="btn-add btn-toggle">Añadir</button>
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
            <img src="${enemigo.avatar}" alt="${enemigo.nombre}" class="enemy-image">
            <p><strong>${enemigo.nombre}</strong></p>
            <p>${enemigo.nivelAtaque} puntos de ataque</p>

        `;
        listContainer.appendChild(enemyElement);
    });
}

// Función para renderizar el inventario en la escena de batalla
function renderizarInventarioBatalla() {
    // El contenedor principal de todo el bloque de inventario
    const inventarioContainer = document.getElementById('inventory-display-battle');
    if (!inventarioContainer) return;

    const slotsContainer = document.getElementById('battle-inventory-list');
    
    // Si la lista interna no existe, salimos
    if (!slotsContainer) return;

    slotsContainer.innerHTML = ''; // Limpiar la lista antes de dibujar

    // Si no hay objetos, mostramos el mensaje (opcional, si quieres un mensaje)
    if (jugadoraActual.inventario.length === 0) {
        return;
    }
    
    // Si hay ítems, los dibujamos
    jugadoraActual.inventario.forEach(producto => {
        // Creamos la casilla visual 
        const slot = document.createElement('div');
        
        slot.classList.add('item'); 
        
        // Creación de la imagen
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        
        slot.appendChild(img);
        slotsContainer.appendChild(slot);
    });
   
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
        btn.classList.remove('btn-toggle'); 
        // btn.style.background = "#fff"; 

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
        btn.classList.add('btn-toggle'); 
        // btn.style.background = "gold"; 

        // Quitar del inventario por nombre
        jugadoraActual.inventario = jugadoraActual.inventario.filter(p => p.nombre !== nombreProducto);
    }

    // Actualizar inventario
    actualizarVistaJugador('scene-market');
}

// BATALLAS

// Funcion iniciar las batallas/combates
function iniciarEscenaBatalla() {
    indiceBatalla = 0;
    mostrarBatalla(); // Llama a la primera batalla
}


// Función mostrar la batalla actual
function mostrarBatalla() {
 // Jugadora muere o enemigos terminan
    if (jugadoraActual.puntosVida <= 0 || indiceBatalla >= enemigos.length) {
        renderizarEscenaFinal();
        cambiarEscena('scene-final');
        return;
    }

    const enemigoActual = enemigos[indiceBatalla];
    cambiarEscena('scene-battle');

    // renderizacion de nombre e img
    document.getElementById('battle-player-image').src = jugadoraActual.avatar;
    document.getElementById('battle-enemy-image').src = enemigoActual.avatar;
    document.getElementById('battle-enemy-name').textContent = enemigoActual.nombre;

    // Ejecuta el combate (Un turno/golpe)
    const resultado = combate(enemigoActual, jugadoraActual);
    const vidaEnemigoActual = Math.max(0, resultado.vidaRestanteEnemigo);
    
    jugadoraActual.puntosVida = Math.max(0, resultado.vidaRestanteJugador);

    // Actualizar UI de la Batalla (Vidas y Inventario)
    document.getElementById('battle-player-life').textContent = jugadoraActual.puntosVida;
    document.getElementById('battle-enemy-life').textContent = vidaEnemigoActual;
    renderizarInventarioBatalla();

    // Mostrar resultados
    let ganadorTexto = '';
    
    if (resultado.ganador === jugadoraActual.nombre) {
        ganadorTexto = `${jugadoraActual.nombre}`;
    } else if (resultado.ganador === enemigoActual.nombre) {
        ganadorTexto = `${enemigoActual.nombre}`;
    } else {
        // En caso de empate/continuar, se muestra el jugador que golpeó más fuerte o "Nadie".
        ganadorTexto = 'Continuar batallas'; 
    }

    document.getElementById('battle-result').innerHTML = `
        <p><strong>Ganador:</strong> ${ganadorTexto}</p>
        <p><strong>Puntos ganados:</strong> ${resultado.puntos}</p>
    `;

    // Mostrar los Puntos totales
    document.getElementById('player-total-points').textContent = jugadoraActual.puntos;

    // Controlar el índice y el botón
    const btnNextBattle = document.getElementById('btn-next-battle');
    
    // Si el enemigo es derrotado, avanza el índice.
    if (vidaEnemigoActual === 0) {
        indiceBatalla++; 
    } 
    
    // Botones de las batallas
    if (jugadoraActual.puntosVida <= 0 || indiceBatalla >= enemigos.length) {
        btnNextBattle.textContent = 'Continuar'; // Lleva a Escena 6
    } else if (vidaEnemigoActual === 0) {
        // Si el enemigo fue derrotado pero quedan más
        btnNextBattle.textContent = `Continuar las batallas (${indiceBatalla + 1}/${enemigos.length})`;
    } else {
        // Si el combate debe seguir contra el mismo enemigo
        btnNextBattle.textContent = 'Atacar de Nuevo'; 
    }
    btnNextBattle.style.display = 'block';

    // Actualiza las estadísticas
    actualizarVistaJugador('scene-updated-stats');
}


// Función renderizar batallas, escena 6 final 
function renderizarEscenaFinal() {
   // Obtener elementos
    const finalMessageElement = document.getElementById('final-message');
    const finalStatsElement = document.getElementById('final-stats');
    const finalInventoryElement = document.getElementById('final-inventory'); 

    // Verificación de existencia de elementos HTML
    if (!finalMessageElement || !finalStatsElement || !finalInventoryElement) return;

    // Calculos
    const totalPuntos = jugadoraActual.puntos;
    const estaViva = jugadoraActual.puntosVida > 0;
    
    // Calcula el rango, enemigos derrotados, etc.
    const rangoJugador = distinguirJugador(totalPuntos); 
    const enemigosDerrotados = (indiceBatalla > 0 && jugadoraActual.puntosVida <= 0) ? indiceBatalla - 1 : indiceBatalla;
    let nombreCausanteDerrota = '';
    
    if (!estaViva && indiceBatalla > 0) {
        const indiceCausante = Math.max(0, indiceBatalla - 1);
        nombreCausanteDerrota = enemigos[indiceCausante] ? enemigos[indiceCausante].nombre : '';
    }

    
    // Determinar el Mensaje Principal (Victoria/Derrota)
    if (estaViva && indiceBatalla >= enemigos.length) {
        finalMessageElement.innerHTML = `<p>Has derrotado a ${enemigos.length} dragones.</p>`;
        lanzarConfettiVictoria(); //LLAMAR A LA FUNCIÓN CONFETTI.
    } else {
        finalMessageElement.innerHTML = `<p>Perdiste, fin de la batalla</p><p>Has sido derrotada por ${nombreCausanteDerrota}.</p>`;
        lanzarConfetiDerrota(); //Confetti de perdedor

    }

    // Mostrar las Estadísticas y Rango
    const mensajeRangoCompleto = (rangoJugador === "Veterano")
    ? `¡Felicidades! La jugadora ha conseguido ser una <strong>Veterana</strong>.`
    : `La jugadora es una <strong>Novata</strong>. ¡Sigue practicando!`;

    finalStatsElement.innerHTML = `
    <h4>Estadísticas Finales</h4>
    <p>${mensajeRangoCompleto}<br>Ha conseguido un total de <strong>${totalPuntos}</strong> puntos en la batalla.</p>
    <p><strong>Batallas completadas:</strong> ${enemigosDerrotados} de ${enemigos.length}</p>
    <p><strong>Vida restante:</strong> ${Math.max(0, jugadoraActual.puntosVida)}</p> `;


    // RENDERIZADO DEL INVENTARIO FINAL
    
    // Limpiamos el contenedor
    finalInventoryElement.innerHTML = ''; 

    // Crear y configurar el div
    const contenedorLista = document.createElement('div');
    contenedorLista.id = 'battle-inventory-list';
    contenedorLista.classList.add('cart-grid');
    finalInventoryElement.appendChild(contenedorLista); // Adjuntar al padre

    // Si no hay objetos, mostramos solo un mensaje
    if (jugadoraActual.inventario.length === 0) {
        contenedorLista.innerHTML = '<p style="text-align:center; padding: 10px;">No hay objetos comprados</p>';
    } else {
        // Llenar la lista con los ítems
        jugadoraActual.inventario.forEach(producto => {
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            
            itemDiv.appendChild(img); 
            contenedorLista.appendChild(itemDiv);
        });
    }

    // Mostrar botón reiniciar juego
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
        btnRestart.style.display = 'block'; 
    }
}

// Función para lanzar confetti, cuando gana la jugadora.
function lanzarConfettiVictoria() {
    if (typeof confetti === 'function') {
        
        // Ejecuta la animación 
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
    } 
}

// Funcion confetti de perdedor, cae para abajo
function lanzarConfetiDerrota() {
    if (typeof confetti === 'function') {
        
        confetti({
            particleCount: 80,
            spread: 80, 
            angle: 270, // Cayendo ligeramente hacia abajo
            startVelocity: 30,
            origin: { y: 0.5, x: 0.5 }, // Centro de la pantalla
            colors: ['#000000', '#333333', '#666666']
        });
        
    } 
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
            // Actualiza el inventario
            actualizarVistaJugador('scene-market'); 
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

            // Ir a la escena 6
            if (jugadoraActual.puntosVida <= 0 || indiceBatalla >= enemigos.length) {
                renderizarEscenaFinal(); // Renderiza los resultados
                cambiarEscena("scene-final"); // Cambia de escena
                
            } else {
                mostrarBatalla(); 
            }
        });
    }

    // Botón reiniciar juego
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.addEventListener('click', inicializarJuego);
});