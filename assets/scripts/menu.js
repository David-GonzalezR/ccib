// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => { 
    // Selecciona los elementos necesarios
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