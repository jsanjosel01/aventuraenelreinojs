// Batallas
import { Jefe } from "../clases/Jefe.js";

//Funcion combate, calcular daño
export function combate(enemigo, jugador) {
    const ataqueJugador = jugador.obtenerAtaqueTotal();
    const defensaJugador = jugador.obtenerDefensaTotal();

    const danoJugador = ataqueJugador; // Daño que hace el jugador un golpe
    
    // Daño que hace el enemigo
    let danoBaseEnemigo = enemigo.nivelAtaque;
    
    if (enemigo instanceof Jefe) {
        danoBaseEnemigo *= enemigo.multiplicadorDano || 1.5; 
    }
    const danoEnemigoFinal = Math.max(0, danoBaseEnemigo - defensaJugador);
    
    // Mostrar de Vida
    const vidaEnemigoDespues = Math.max(0, enemigo.puntosVida - danoJugador);
    const vidaJugadorDespues = Math.max(0, jugador.puntosVida - danoEnemigoFinal);
    
    // Determinar Ganador y Actualizar Objetos Persistentes
    let ganador = 'Empate';
    let puntosGanados = 0;

    if (vidaEnemigoDespues === 0) {
        ganador = jugador.nombre; //Jugadora gana
        
        // Puntos ganados
        puntosGanados = enemigo.puntosVida * (enemigo instanceof Jefe ? 1.5 : 1); 
        puntosGanados = Math.round(puntosGanados);
        
        // Actualizaciones
        jugador.sumarPuntos(puntosGanados);
        jugador.puntosVida = vidaJugadorDespues;
        enemigo.puntosVida = 0; // Perdio Enemigo
        
    } else if (danoEnemigoFinal > 0 && vidaJugadorDespues === 0) {
        ganador = enemigo.nombre; //Jugadora pierde
        puntosGanados = 0;
        
        // actualizaciones
        jugador.puntosVida = 0;
        enemigo.puntosVida = vidaEnemigoDespues; 

    } else {
        ganador = 'Continuar'; // Empate, continua el combate
        puntosGanados = 0;

        // actul. Ambos reciben daño
        jugador.puntosVida = vidaJugadorDespues;
        enemigo.puntosVida = vidaEnemigoDespues;
    }

    // Mostrar resultados 
    return {
        ganador: ganador,
        puntos: puntosGanados,
        vidaRestanteJugador: Math.round(jugador.puntosVida), 
        vidaRestanteEnemigo: Math.round(enemigo.puntosVida)
    };
}