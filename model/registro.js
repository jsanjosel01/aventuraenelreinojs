
export function initRegistro(showScene) {
  const registroSection = document.getElementById('registro');

  registroSection.innerHTML = `
    <div class="form-group">
    <label>Nombre: </label>
    <input type="text" id="username">
    <div class="error" id="usernameError" required minlength="20"></div>
    </div>

    <div class="form-group">
    <label>Ataque: </label>
    <input type="number" id="ataque" >
    <div class="error" id="ataqueError" required minlength="0"></div>
    </div>

    <div class="form-group">
    <label>Defensa: </label>
    <input type="number" id="defensa" >
    <div class="error" id="defensaError" required minlength="0"></div>
    </div>

    <div class="form-group">
    <label>Vida: </label>
    <input type="number" id="vida" >
    <div class="error" id="vidaError" required minlength="99"></div>
    </div>

    <div class="form-group">
    <label>Cantidad Total: </label>
    <input type="number" id="cantidadTotal" >
    <div class="error" id="cantidadTotalError" min="0" max="110"></div>
    </div>

`;
}

const username = document.getElementById('username');
const ataque = document.getElementById('ataque');
const defensa = document.getElementById('defensa');
const vida = document.getElementById('vida');
const cantidadTotal = document.getElementById('cantidadTotal');
const botonRegistrar = document.getElementById('botonRegistrar');


// Registrar usuario
  botonRegistrar.addEventListener('click', () => {
    const user = username.value.trim();
    const ataq = ataque.value.trim();
    const def = defensa.value.trim();
    const vid = vida.value.trim();
    const cantidT = cantidadTotal.value.trim();

    // Validaciones básicas
    if (!user || ataq || def || vid || cantidT) {
      mensajeRegistro.style.color = 'red';
      mensajeRegistro.textContent = 'Completa todos los campos.'; 
      return;
    }

    if (localStorage.getItem(user)) {
      mensajeRegistro.style.color = 'red';
      mensajeRegistro.textContent = 'El usuario/a ya existe.';
      return;
    }


     // Guardar usuario en localStorage
    const userData = {
      username: user,
      ataque: ataq,
      defensa: def,
      vida:vid,
      cantidadTotal:cantidT
    };

    localStorage.setItem(user, JSON.stringify(userData));

    mensajeRegistro.style.color = 'green';
    mensajeRegistro.textContent = '¡Te has registrado correctamente!';


 
});

 // Registrar Ranking
  botonMostrarRanking.addEventListener('click', () => {
    const user = username.value.trim();
    const punt = puntos.value.trim();
    const monedasT = monedasTotales.value.trim();
   
    // Guardar Ranking en localStorage
    const ranking = {
      username: user,
      puntos: punt,
      monedasTotales: monedasT
    };

    localStorage.setItem(user, punt, monedasT, JSON.stringify(ranking));
    console(ranking);

});