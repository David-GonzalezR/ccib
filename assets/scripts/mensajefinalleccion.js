
// Función para guardar las respuestas en localStorage
function guardarRespuesta(idElemento, preguntaId) {
    let respuestas = JSON.parse(localStorage.getItem('unidad1-leccion1')) || {};
    
    
    // Si es un textarea, obtener su valor y guardarlo
    if (idElemento.startsWith('respuesta')) {
        const respuesta = document.getElementById(idElemento).value;
        if (!respuesta) {
            alert("Por favor, escribe una respuesta antes de guardar.");
            return;
        }
        respuestas[`pregunta-${preguntaId}`] = respuesta;
    }
    // Si es un formulario con checkboxes
    else if (idElemento.startsWith('formulario')) {
        let formulario = document.getElementById(idElemento);
        if (!formulario) return;

        let checkboxes = formulario.querySelectorAll('input[type="checkbox"]:checked');
        let respuestasCheckbox = [];
        checkboxes.forEach((checkbox) => {
            respuestasCheckbox.push(checkbox.value); // Guardar el valor en lugar del id
        });
        respuestas[`pregunta-${preguntaId}`] = respuestasCheckbox;
    }
       
    // Si es un radio button
    else if (idElemento.startsWith('radio')) {       

        // Verificar si el 'preguntaId' se está pasando correctamente
        

        let seleccion = document.querySelector(`input[name="${preguntaId}"]:checked`);
        

        if (seleccion) {
            respuestas[`pregunta-${preguntaId}`] = seleccion.value;
        } else {
            alert("Por favor, selecciona una opción antes de guardar.");
            return;
        }
    }

    // Guardar en localStorage
    localStorage.setItem('unidad1-leccion1', JSON.stringify(respuestas));

    alert("Respuestas guardadas correctamente.");
}


document.addEventListener("DOMContentLoaded", function () {

   
    // Recupera el nombre del estudiante del localStorage. Si no existe, se usará "Estudiante"
    const userName = localStorage.getItem("userName") || "Estudiante";

    // Crea el mensaje personalizado
    const mensajeHTML = `
  <h1>🥳 ! Felicitaciones  <strong>${userName} ¡ 🎉</strong></h1>
   
`;

    // Inserta el mensaje en el elemento con id "mensaje"
    document.querySelectorAll(".mensaje").forEach(elemento => {
        elemento.innerHTML = mensajeHTML;
    });
    
    // Función de ejemplo para el botón
    function enviarRespuestas() {
        // Aquí iría la lógica para enviar las respuestas.
        alert("Respuestas enviadas correctamente.");
    }




   



// Función para cargar respuestas almacenadas en los textareas y checkboxes
function cargarRespuestas() {
    let respuestas = JSON.parse(localStorage.getItem('unidad1-leccion1')) || {};

    for (const preguntaId in respuestas) {
        
        let respuesta = respuestas[preguntaId];        

        // Si es un array, significa que es un formulario con checkboxes
        if (Array.isArray(respuesta)) {
            let idFormulario = `formulario-${preguntaId.replace('pregunta-', '')}`;
            let formulario = document.getElementById(idFormulario);
            if (!formulario) continue;

            let checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                if (respuesta.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        } 
        // Si es un string, puede ser un textarea o un radio button
        else {
            // Si es un textarea
            let idTextarea = `respuesta-${preguntaId.replace('pregunta-', '')}`;
            let textarea = document.getElementById(idTextarea);
            if (textarea) {
                textarea.value = respuesta;
                continue;
            }

            // Si es un radio button
            let opcionSeleccionada = document.querySelector(`input[name="${preguntaId.replace('pregunta-', '')}"][value="${respuesta}"]`);
            
            if (opcionSeleccionada) {
                opcionSeleccionada.checked = true;
            }
        }
    }
}

// Ejecutar la carga de respuestas al iniciar la página
window.addEventListener('load', cargarRespuestas);



})