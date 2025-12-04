// Funcion cambiar las escenas

/**
 * @fileoverview Módulo de funciones de utilidad para manipulación del DOM y formateo de datos.
 * @exports cambiarEscena
 * @exports formatCurrency
 */

/**
 * Muestra la escena del juego especificada por su ID y oculta todas las demás secciones con la clase '.game-scene'.
 * Se utiliza para la navegación entre estados del juego.
 * @param {string} sceneId - El ID (`id` HTML) de la escena que debe mostrarse.
 */

export function cambiarEscena(sceneId) {
    const escenas = document.querySelectorAll('.game-scene');
    
    // Ocultar todas las escenas
    escenas.forEach(scene => {
        if (scene.id === sceneId) {
            // Mostrar lista de objetos
            scene.classList.add('active-scene');
            scene.classList.remove('hidden-scene');
        } else {
            // Ocultar
            scene.classList.remove('active-scene');
            scene.classList.add('hidden-scene');
        }
    });
    
}

// FormatCurrency precio en centimos por 100

/**
 * Convierte un precio dado en céntimos a una cadena de texto en formato de euros (€).
 * Mantiene dos decimales para precisión monetaria.
 * @param {number} precioEnCentimos - La cantidad numérica del precio en céntimos (ej: 1200).
 * @returns {string} La cantidad formateada como cadena de texto (Ej: "12.00 €").
 */

export function formatCurrency(precioEnCentimos) {
    const euros = precioEnCentimos / 100;
    return `${euros.toFixed(2)} €`;
}