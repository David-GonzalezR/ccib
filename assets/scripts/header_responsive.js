document.addEventListener('DOMContentLoaded', () => { 
    // Selecciona los elementos necesarios
    let button = document.querySelector('.layout__menu-toggle');
    let menu = document.querySelector('.nav-toggle--list');
    let sidebar = document.querySelector('.nav-toggle');

    // Función para alternar la visibilidad de la barra lateral
    function toggleSidebar() {
        let isVisible = sidebar.classList.contains('nav-toggle--visible');

        if (isVisible) {
            sidebar.classList.remove('nav-toggle--visible'); 
            button.classList.remove('active'); // Asegura que el botón vuelve a ☰
        } else {
            sidebar.classList.add('nav-toggle--visible');
            button.classList.add('active'); // Cambia a ✖ solo si se abre
        }
    }

    // Evento de clic en el botón del menú
    button.addEventListener('click', toggleSidebar);

    // Evento de clic en la lista de lecciones para ocultar el menú
    menu.addEventListener('click', toggleSidebar);

   
});
