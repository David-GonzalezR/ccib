document.addEventListener("DOMContentLoaded", function () {
    const userNameDisplay = document.getElementById("user-name-display");

    function actualizarNombreEnHeader() {
        const nombreGuardado = localStorage.getItem("userName");
        if (nombreGuardado && userNameDisplay) {
            userNameDisplay.textContent = `${nombreGuardado}`;
        }
    }

    // Si ya hay un nombre guardado, lo muestra en el header
    actualizarNombreEnHeader();
});