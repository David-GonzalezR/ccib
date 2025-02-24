function toggleDarkMode() {
  const body = document.body;
  const button = document.querySelector('.mode-btn');

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      button.innerHTML = "☀️";
      localStorage.setItem("theme", "dark");
  } else {
      button.innerHTML = "🌓";
      localStorage.setItem("theme", "light");
  }
}

// Aplicar el modo guardado en localStorage
window.onload = function() {
  if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      document.querySelector('.mode-btn').innerHTML = "☀️ Modo Claro";
  }
};

// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
document.querySelector('.size-font').addEventListener('click', function() {
  this.style.transform = this.style.transform === 'translateX(-135%)' ? 'translateX(0)' : 'translateX(-135%)';
});


document.addEventListener('DOMContentLoaded', () => { 
    // Selecciona los elementos necesarios
    let herrameientas = document.querySelector('.size-font')
    let button = document.querySelector('.layout__menu-toggle');
    let lecciones = document.querySelector('.sidebar__list');
    let sidebar = document.querySelector('.sidebar');

    // Función para alternar la visibilidad de la barra lateral
    function toggleSidebar() {
        let isVisible = sidebar.classList.contains('layout__sidebar--visible');

        if (isVisible) {
            sidebar.classList.remove('layout__sidebar--visible'); 
            button.classList.remove('active'); // Asegura que el botón vuelve a ☰
        } else {
            sidebar.classList.add('layout__sidebar--visible');
            button.classList.add('active'); // Cambia a ✖ solo si se abre
        }
    }

    // Evento de clic en el botón del menú
    button.addEventListener('click', toggleSidebar);

    // Evento de clic en la lista de lecciones para ocultar el menú
    lecciones.addEventListener('click', toggleSidebar);

   
});
function loadFontSize() {
    let savedSize = localStorage.getItem("fontSize");
    if (savedSize) {
      document.body.style.fontSize = savedSize + "px";
    }
  }

  function changeFontSize(change) {
    let body = document.body;
    let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    let newSize = currentSize + change;

    body.style.fontSize = newSize + "px";
    localStorage.setItem("fontSize", newSize); // Guardar en localStorage
  }

  // Cargar el tamaño de fuente al abrir la página
  loadFontSize();