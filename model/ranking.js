// Contiene los resultados finales del juego

// Función para distingir si es veterano o novato.
export function distinguirJugador(puntuacion, umbral = 300) { //Valor límite
    if (puntuacion > umbral) {
        return "Veterano"; // Pro
    } else {
        return "Novato"; // ó Rookie
    }
}