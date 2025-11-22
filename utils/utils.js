
// Funcion cambiar las escenas
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
export function formatCurrency(precioEnCentimos) {
    const euros = precioEnCentimos / 100;
    return `${euros.toFixed(2)} €`;
}