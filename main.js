
let jugadorSeleccionado;
const equipo = [];
let presupuesto = 5000000; 
// Objetos, lista de jugadores
const jugadores = [
  { id: 1, nombre: "Lionel Messi", precio: 1000000, equipo: "Inter Miami", nacionalidad: "Argentina" },
  { id: 2, nombre: "Cristiano Ronaldo", precio: 950000, equipo: "Al-Nassr", nacionalidad: "Portugal" },
  { id: 3, nombre: "Kylian Mbappé", precio: 1200000, equipo: "PSG", nacionalidad: "Francia" },
  { id: 4, nombre: "Erling Haaland", precio: 1100000, equipo: "Manchester City", nacionalidad: "Noruega" },
  { id: 5, nombre: "Ángel Di María", precio: 850000, equipo: "Benfica", nacionalidad: "Argentina" },
  { id: 6, nombre: "Paulo Dybala", precio: 900000, equipo: "Roma", nacionalidad: "Argentina" },
  { id: 7, nombre: "Lautaro Martínez", precio: 950000, equipo: "Inter de Milán", nacionalidad: "Argentina" },
  { id: 8, nombre: "Emiliano Martínez", precio: 800000, equipo: "Aston Villa", nacionalidad: "Argentina" },
  { id: 9, nombre: "Bernardo Silva", precio: 920000, equipo: "Manchester City", nacionalidad: "Portugal" },
  { id: 10, nombre: "Bruno Fernandes", precio: 880000, equipo: "Manchester United", nacionalidad: "Portugal" },
  { id: 11, nombre: "João Félix", precio: 870000, equipo: "Barcelona", nacionalidad: "Portugal" },
  { id: 12, nombre: "Rúben Dias", precio: 890000, equipo: "Manchester City", nacionalidad: "Portugal" },
  { id: 13, nombre: "Neymar Jr.", precio: 1150000, equipo: "Al-Hilal", nacionalidad: "Brasil" },
  { id: 14, nombre: "Vinícius Jr.", precio: 1120000, equipo: "Real Madrid", nacionalidad: "Brasil" },
  { id: 15, nombre: "Casemiro", precio: 1050000, equipo: "Manchester United", nacionalidad: "Brasil" },
  { id: 16, nombre: "Alisson Becker", precio: 950000, equipo: "Liverpool", nacionalidad: "Brasil" },
  { id: 17, nombre: "Antoine Griezmann", precio: 880000, equipo: "Atlético de Madrid", nacionalidad: "Francia" },
  { id: 18, nombre: "Olivier Giroud", precio: 840000, equipo: "AC Milan", nacionalidad: "Francia" },
  { id: 19, nombre: "N'Golo Kanté", precio: 890000, equipo: "Al-Ittihad", nacionalidad: "Francia" },
  { id: 20, nombre: "Kingsley Coman", precio: 870000, equipo: "Bayern Múnich", nacionalidad: "Francia" },
];

function mostrarJugadores() {
  let lista = "Jugadores disponibles:\n";
  jugadores.forEach((jugador) => {
    lista += `${jugador.id}. ${jugador.nombre} - $${jugador.precio} - Equipo: ${jugador.equipo} - Nacionalidad: ${jugador.nacionalidad}\n`;
  });
  alert(lista);
}

function capturarDatos() {
  mostrarJugadores();

  const idJugador = parseInt(prompt("Ingrese el ID del jugador que desea contratar:"));
  jugadorSeleccionado = jugadores.find((jugador) => jugador.id === idJugador);
  if (!jugadorSeleccionado) {
    alert("Jugador no encontrado. Intente de nuevo.");
    return;
  }
  agregarAlEquipo(jugadorSeleccionado);
}

function agregarAlEquipo(jugador) {
  if (equipo.some((j) => j.id === jugador.id)) {
    alert("Este jugador ya está en tu equipo.");
    return;
  }
  presupuesto -= jugador.precio; 
  alert(`${jugador.nombre} ha sido fichado.`);
  equipo.push(jugador);
  alert(`Se agregó a ${jugador.nombre} al equipo.`);
}
function mostrarPresupuesto() {
  alert(`Presupuesto disponible: $${presupuesto}`);
}

function mostrarEquipo() {
  if (equipo.length === 0) {
    alert("El equipo está vacío.");
    return;
  }
  let detalleEquipo = "Equipo actual:\n";
  equipo.forEach((jugador, index) => {
    detalleEquipo += `${index + 1}. ${jugador.nombre} - Equipo: ${jugador.equipo} - Nacionalidad: ${jugador.nacionalidad}\n`;
  });
  alert(detalleEquipo);
}

function filtrarJugadoresPorNacionalidad() {
  const nacionalidad = prompt("Ingrese la nacionalidad por la que desea filtrar (e.g., Argentina, Portugal, Brasil, Francia):");
  const filtrados = jugadores.filter((jugador) => jugador.nacionalidad.toLowerCase() === nacionalidad.toLowerCase());
  
  if (filtrados.length === 0) {
    alert(`No se encontraron jugadores de nacionalidad ${nacionalidad}.`);
    return;
  }
  
  let listaFiltrados = `Jugadores de nacionalidad ${nacionalidad}:\n`;
  filtrados.forEach((jugador) => {
    listaFiltrados += `${jugador.id}. ${jugador.nombre} - $${jugador.precio} - Equipo: ${jugador.equipo}\n`;
  });
  
  alert(listaFiltrados);
  
  const idJugador = parseInt(prompt("Ingrese el ID del jugador que desea contratar:"));
  const jugadorSeleccionado = filtrados.find((jugador) => jugador.id === idJugador);
  
  if (!jugadorSeleccionado) {
    alert("Jugador no encontrado. Intente de nuevo.");
    return;
  }
  if (jugadorSeleccionado.precio > presupuesto) {
    alert("No tienes suficiente presupuesto para fichar a este jugador.");
    return;
}
agregarAlEquipo(jugadorSeleccionado);
}

// Ejecucion
do {
  mostrarPresupuesto();
  filtrarJugadoresPorNacionalidad();
  mostrarEquipo();
} while (equipo.length < 5);

alert("¡Felicidades! Has formado tu equipo de 5 jugadores.");
mostrarEquipo();
