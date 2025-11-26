// Batallas

//Funcion combate
export function combate(enemigo, jugador) {
    
    const enemigoActual = { ...enemigo }; //Clonar enemigo, asi no se modifica el original

    let vidaJugador = jugador.obtenerVidaTotal();
    let vidaEnemigo = enemigoActual.puntosVida;

    const ataqueJugador = jugador.obtenerAtaqueTotal();
    const defensaJugador = jugador.obtenerDefensaTotal();

    // Turnos jugadora & enemigo, hasta que la vida llegue a 0
    while (vidaJugador > 0 && vidaEnemigo > 0) {
        
        vidaEnemigo -= ataqueJugador; // Jugadora ataca enemigo

        if (vidaEnemigo <= 0) break; // Si enemigo muere, gameover. FIN DEL JUEGO

        // Enemigo ataca jugadora
        const danoEnemigo = enemigoActual.nivelAtaque * (enemigoActual instanceof Jefe ? enemigoActual.multiplicadorDano : 1);
        vidaJugador = (vidaJugador + defensaJugador) - danoEnemigo;
    }

    // Calcular resultados
    if (vidaJugador > 0) {
        // Jugadora gana
        let puntos = 100 + enemigo.nivelAtaque;
        if (enemigo instanceof Jefe) puntos *= enemigo.multiplicadorDano;

        jugador.sumarPuntos(Math.round(puntos));

        return {
            ganador: jugador.nombre,
            puntos: Math.round(puntos),
            vidaRestanteJugador: Math.round(vidaJugador),
            vidaRestanteEnemigo: Math.max(0, Math.round(vidaEnemigo))
        };
    } else {
        // Jugadora pierde
        return {
            ganador: enemigo.nombre,
            puntos: 0,
            vidaRestanteJugador: 0,
            vidaRestanteEnemigo: Math.max(0, Math.round(vidaEnemigo))
        };
    }
}