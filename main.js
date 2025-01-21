//lista de jugadores a fichar
const jugadores = [
  { id: 1, nombre: "Lionel Messi", precio: 1000000, equipo: "Inter Miami", nacionalidad: "Argentina", puntuacion: 95 },
  { id: 2, nombre: "Cristiano Ronaldo", precio: 950000, equipo: "Al-Nassr", nacionalidad: "Portugal", puntuacion: 92 },
  { id: 3, nombre: "Kylian Mbappé", precio: 1200000, equipo: "PSG", nacionalidad: "Francia", puntuacion: 97 },
  { id: 4, nombre: "Erling Haaland", precio: 1100000, equipo: "Manchester City", nacionalidad: "Noruega", puntuacion: 96 },
  { id: 5, nombre: "Ángel Di María", precio: 850000, equipo: "Benfica", nacionalidad: "Argentina", puntuacion: 89 },
  { id: 6, nombre: "Paulo Dybala", precio: 900000, equipo: "Roma", nacionalidad: "Argentina", puntuacion: 88 },
  { id: 7, nombre: "Lautaro Martínez", precio: 950000, equipo: "Inter de Milán", nacionalidad: "Argentina", puntuacion: 90 },
  { id: 8, nombre: "Emiliano Martínez", precio: 800000, equipo: "Aston Villa", nacionalidad: "Argentina", puntuacion: 87 },
  { id: 9, nombre: "Bernardo Silva", precio: 920000, equipo: "Manchester City", nacionalidad: "Portugal", puntuacion: 91 },
  { id: 10, nombre: "Bruno Fernandes", precio: 880000, equipo: "Manchester United", nacionalidad: "Portugal", puntuacion: 90 },
  { id: 11, nombre: "João Félix", precio: 870000, equipo: "Barcelona", nacionalidad: "Portugal", puntuacion: 88 },
  { id: 12, nombre: "Rúben Dias", precio: 890000, equipo: "Manchester City", nacionalidad: "Portugal", puntuacion: 89 },
  { id: 13, nombre: "Neymar Jr.", precio: 1150000, equipo: "Al-Hilal", nacionalidad: "Brasil", puntuacion: 94 },
  { id: 14, nombre: "Vinícius Jr.", precio: 1120000, equipo: "Real Madrid", nacionalidad: "Brasil", puntuacion: 93 },
  { id: 15, nombre: "Casemiro", precio: 1050000, equipo: "Manchester United", nacionalidad: "Brasil", puntuacion: 92 },
  { id: 16, nombre: "Alisson Becker", precio: 950000, equipo: "Liverpool", nacionalidad: "Brasil", puntuacion: 91 },
  { id: 17, nombre: "Antoine Griezmann", precio: 880000, equipo: "Atlético de Madrid", nacionalidad: "Francia", puntuacion: 89 },
  { id: 18, nombre: "Olivier Giroud", precio: 840000, equipo: "AC Milan", nacionalidad: "Francia", puntuacion: 86 },
  { id: 19, nombre: "N'Golo Kanté", precio: 890000, equipo: "Al-Ittihad", nacionalidad: "Francia", puntuacion: 88 },
  { id: 20, nombre: "Kingsley Coman", precio: 870000, equipo: "Bayern Múnich", nacionalidad: "Francia", puntuacion: 87 },
];

let presupuesto = 5000000;
const equipo = [];

const playerListDiv = document.getElementById("player-list");
const budgetSpan = document.getElementById("budget");
const teamList = document.getElementById("team-list");
const resetBtn = document.getElementById("reset-btn");

// Almacenar y recuperar datos en LocalStorage
function guardarDatos() {
  localStorage.setItem("equipo", JSON.stringify(equipo));
  localStorage.setItem("presupuesto", presupuesto);
}

function cargarDatos() {
  const equipoGuardado = JSON.parse(localStorage.getItem("equipo")) || [];
  const presupuestoGuardado = localStorage.getItem("presupuesto");

  equipo.push(...equipoGuardado);
  presupuesto = presupuestoGuardado ? parseInt(presupuestoGuardado) : 5000000;

  actualizarEquipo();
}

// Muestra de jugadores
function mostrarJugadores() {
  playerListDiv.innerHTML = jugadores
    .map(
      ({ id, nombre, equipo, nacionalidad, precio }) => `
      <div class="player-card">
        <h3>${nombre}</h3>
        <p>Equipo: ${equipo}</p>
        <p>Nacionalidad: ${nacionalidad}</p>
        <p>Precio: $${precio}</p>
        <div class="actions">
          <button onclick="ficharJugador(${id})">Fichar</button>
        </div>
      </div>`
    )
    .join("");
}

// Funcion para fichar al jugador
function ficharJugador(id) {
  if (equipo.length >= 5) {
    calcularResultados();
    return;
  }

  const jugador = jugadores.find((j) => j.id === id);
  if (equipo.includes(jugador)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Este jugador ya está en tu equipo"
    });
    return;
  }
  if (presupuesto < jugador.precio) {
    Swal.fire({
      title: "No tienes suficiente presupuesto",
      html: `
        <p>Reinicia el simulador y revisa tus gastos.</p>`,
      icon: "error",
    });
    return;
  }

  equipo.push(jugador);
  presupuesto -= jugador.precio;
  actualizarEquipo();
  guardarDatos();
}

// Actualiza equipo y presupuesto
function actualizarEquipo() {
  teamList.innerHTML = equipo
    .map(
      ({ nombre, equipo, precio }) => `
      <li>${nombre} (${equipo}) - $${precio}</li>`
    )
    .join("");

  budgetSpan.textContent = presupuesto;
}

// Resultados
function calcularResultados() {
  const presupuestoGastado = 5000000 - presupuesto;
  const puntuacionTotal = equipo.reduce((total, { puntuacion }) => total + puntuacion, 0);

  Swal.fire({
    title: "¡Felicitaciones!",
    html: `
      <p>Has armado un gran equipo.</p>
      <p><strong>Presupuesto gastado:</strong> $${presupuestoGastado}</p>
      <p><strong>Puntuación total del equipo:</strong> ${puntuacionTotal}</p>
    `,
    icon: "success",
  });
}

// reinicio de simulacion de fichajes
resetBtn.addEventListener("click", () => {
  presupuesto = 5000000;
  equipo.length = 0;
  localStorage.clear();
  actualizarEquipo();
  mostrarJugadores();
});


cargarDatos();
mostrarJugadores();
