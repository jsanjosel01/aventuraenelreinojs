// Contiene los resultados finales del juego

/**
 * @fileoverview Módulo que contiene la lógica para determinar la clasificación final de un jugador.
 * @exports distinguirJugador
 */


/**
 * Determina si un jugador es clasificado como "Veterano" o "Novato" basándose en su puntuación.
 * El resultado depende de si la puntuación supera un umbral límite.
 * * @param {number} puntuacion - La puntuación total obtenida por el jugador.
 * @param {number} [umbral=300] - El valor límite de puntos para la clasificación. Opcional.
 * @returns {string} La clasificación resultante ("Veterano" o "Novato").
 */

// Función para distingir si es veterano o novato.
export function distinguirJugador(puntuacion, umbral = 300) { //Valor límite
    if (puntuacion > umbral) {
        return "Veterano"; // Pro
    } else {
        return "Novato"; // ó Rookie
    }
}