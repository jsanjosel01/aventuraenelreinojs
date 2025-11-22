export default class Jugador {

    constructor(nombre, avatar, vidaInicial = 100) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];

        // Vida está a 100
        this.vida = vidaInicial;
        this.vidaMaxima = vidaInicial;
    }

    //Añadir un objeto al inventario
    añadirObjetoAlInventario(producto) {
        this.inventario.push(producto); //Se clona
    }

    //Sumar puntos al jugador cuando gane batallas.
    sumarPuntos(puntosGanados) {
        this.puntos += puntosGanados;
    }
    
    //Obtener ataque total
    obtenerAtaqueTotal() {
        return this.inventario
            .filter(item => item.tipo === 'Arma')
            .reduce((total, item) => total + item.bonus, 0);
    }

    //Obtener defensa total
    obtenerDefensaTotal() {
        return this.inventario
            .filter(item => item.tipo === 'Armadura')
            .reduce((total, item) => total + item.bonus, 0);
    }
    
    //Obtener vida total
    obtenerVidaTotal() {
        const bonusConsumibles = this.inventario
            .filter(item => item.tipo === 'Consumible')
            .reduce((total, item) => total + item.bonus, 0);
        return this.vidaMaxima + bonusConsumibles;
    }

    // Curar vida
    curarVida() {
        this.vida = this.obtenerVidaTotal();
    }
}
