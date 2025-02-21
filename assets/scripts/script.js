// Espera a que el documento HTML esté completamente cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", function () {
    
    // Obtiene referencias a los elementos del DOM
    const welcomePopup = document.getElementById("welcome-popup"); // Ventana emergente de bienvenida
    const saveUserBtn = document.getElementById("save-user"); // Botón para guardar usuario
    const userNameInput = document.getElementById("user-name"); // Campo de entrada del nombre
    const userWhatsappInput = document.getElementById("user-whatsapp"); // Campo de entrada de WhatsApp
    const userNameDisplay = document.getElementById("user-name-display"); // Elemento donde se muestra el nombre del usuario en el header

    // Función para actualizar el nombre del usuario en la barra de navegación
    function actualizarNombreEnHeader() {
        const nombreGuardado = localStorage.getItem("userName"); // Obtiene el nombre almacenado en localStorage
        if (nombreGuardado) {
            userNameDisplay.textContent = `🧑  ${nombreGuardado}`; // Muestra el nombre con un emoji de persona
        }
    }

    // Si no hay un nombre almacenado en localStorage, muestra el popup de bienvenida
    if (!localStorage.getItem("userName")) {
        welcomePopup.style.display = "flex"; // Hace visible el popup
    } else {
        actualizarNombreEnHeader(); // Si ya hay un nombre guardado, lo muestra en el header
    }

    // Evento para guardar los datos del usuario cuando se haga clic en "Guardar"
    saveUserBtn.addEventListener("click", function () {
        const name = userNameInput.value.trim(); // Obtiene el nombre ingresado y elimina espacios innecesarios
        

        // Valida que los campos no estén vacíos
        if (!name) {
            alert("Por favor, Ingresa tu nombre.");
            return;
        }

        // Guarda los datos en localStorage
        localStorage.setItem("userName", name);
       

        // Oculta el popup de bienvenida
        welcomePopup.style.display = "none";

        // Actualiza el nombre en la barra de navegación
        actualizarNombreEnHeader();
    });

    // Asegura que el nombre en la barra de navegación esté actualizado al cargar la página
    actualizarNombreEnHeader();

    // Referencias a elementos relacionados con la inscripción
    const inscribirmeBtn = document.getElementById("inscribirme-btn"); // Botón de inscripción
    const inscripcionPopup = document.getElementById("popup-inscripcion"); // Ventana emergente de inscripción
    const confirmarInscripcionBtn = document.getElementById("confirmar-inscripcion"); // Botón de confirmar inscripción
    const nombreInput = document.getElementById("nombre"); // Campo de nombre en inscripción
    const telefonoInput = document.getElementById("telefono"); // Campo de teléfono en inscripción
    const masterLink = document.getElementById("master-link");

    // Verifica si el usuario ya está inscrito
    if (localStorage.getItem("inscritoGlobal") === "true") {
        masterLink.classList.remove("disable-link"); // Habilita el enlace
        inscribirmeBtn.textContent = "Inscrito"; // Cambia el texto del botón
        inscribirmeBtn.classList.add("inscrito"); // Aplica estilos de inscrito
        inscribirmeBtn.classList.remove("button-style"); // Quita estilos originales
        inscribirmeBtn.disabled = true; // Deshabilita el botón para evitar clics
    }

    // Muestra el popup de inscripción cuando se hace clic en "Inscribirme"
    inscribirmeBtn.addEventListener("click", function () {
        let nombreGuardado = localStorage.getItem("userName"); // Obtiene el nombre almacenado
        if (nombreGuardado) {
            document.getElementById("saludo-popup").textContent = `¡Felicidades, ${nombreGuardado}!`; // Modifica el h2 con el nombre
        }
        inscripcionPopup.style.display = "flex"; // Muestra el popup
        
    });

    // Evento para confirmar la inscripción
    confirmarInscripcionBtn.addEventListener("click", function () {
        const nombre = nombreInput.value.trim(); // Obtiene el nombre ingresado
        const telefono = telefonoInput.value.trim(); // Obtiene el teléfono ingresado

        // Valida que los campos no estén vacíos
        if (!nombre || !telefono) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Guarda los datos de inscripción en localStorage
        localStorage.setItem("inscritoGlobal", "true");
        localStorage.setItem("nombreUsuario", nombre);
        localStorage.setItem("telefonoUsuario", telefono);

        // Datos para enviar un mensaje por WhatsApp al profesor
        const numeroProfesor = "573150453133"; // Número de WhatsApp del profesor
        const mensaje = `Hola, me quiero inscribir al programa de estudio en Global University. Mis datos son:\n\n📌 Nombre: ${nombre}\n📌 WhatsApp: ${telefono}`;
        const enlaceWhatsApp = `https://wa.me/${numeroProfesor}?text=${encodeURIComponent(mensaje)}`;

        // Abre WhatsApp con el mensaje prellenado en una nueva pestaña
        window.open(enlaceWhatsApp, "_blank");

        // Oculta el popup de inscripción
        inscripcionPopup.style.display = "none";

        // Cambia el botón de inscripción a "Inscrito" y lo deshabilita
        inscribirmeBtn.textContent = "Inscrito";
        inscribirmeBtn.classList.add("inscrito");
        inscribirmeBtn.classList.remove("button-style");
        inscribirmeBtn.disabled = true;
        masterLink.classList.remove("disable-link"); // Habilita el enlace
    });

    // Evento para borrar los datos almacenados en localStorage y recargar la página
    document.getElementById("borrar-datos").addEventListener("click", function () {
        localStorage.clear(); // Borra todos los datos guardados en localStorage
        alert("Se han borrado los datos."); // Muestra un mensaje de confirmación
        location.reload();  // Recarga la página para aplicar los cambios
    });

    

});
