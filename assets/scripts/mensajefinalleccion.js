
document.addEventListener("DOMContentLoaded", function () {

   
    // Recupera el nombre del estudiante del localStorage. Si no existe, se usará "Estudiante"
    const userName = localStorage.getItem("userName") || "Estudiante";

    // Crea el mensaje personalizado
    const mensajeHTML = `
  <h1>🥳 ! Felicitaciones  <strong>${userName} ¡ 🎉</strong></h1>
  <p>Con la gracia de Dios, has completado esta lección y nos alegra ver tu dedicación. Recuerda que cada paso en tu aprendizaje es una bendición y una oportunidad para crecer en sabiduría. Como nos enseña Santiago 1:5:

        "Si a alguno de ustedes le falta sabiduría, pídasela a Dios, quien da a todos abundantemente sin reproche."
        
        Que el Señor continúe guiando cada uno de tus pasos y te ilumine en este camino de conocimiento. ¡Adelante, sigue estudiando y dejando que la luz de Cristo brille en tu vida!
        
        ¡Bendiciones y éxito en tus próximos desafíos! <br> <br>
        Ahora le puedes enviar todas las respuestas a tu tutor, si lo deseas las puedes revisar mas adelante antes de enviarlas. </p>
  
`;

    // Inserta el mensaje en el elemento con id "mensaje"
    document.getElementById("mensaje").innerHTML = mensajeHTML;

    // Función de ejemplo para el botón
    function enviarRespuestas() {
        // Aquí iría la lógica para enviar las respuestas.
        alert("Respuestas enviadas correctamente.");
    }




   // Función para guardar las respuestas en localStorage
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

// Vincular los botones con las funciones para guardar respuestas
document.getElementById('guardar-1').addEventListener('click', function () {
    guardarRespuesta('respuesta-1', 1);
});

document.getElementById('guardar-2').addEventListener('click', function () {
    guardarRespuesta('respuesta-2', 2);
});

document.getElementById('guardar-3').addEventListener('click', function () {
    guardarRespuesta('formulario-3', 3);
});

document.getElementById('guardar-4').addEventListener('click', function () {
    guardarRespuesta('respuesta-4', 4);
});
document.getElementById('guardar-5').addEventListener('click', function () {
    guardarRespuesta('respuesta-5', 5);
});
document.getElementById('guardar-6').addEventListener('click', function () {
    guardarRespuesta('respuesta-6', 6);
});
document.getElementById('guardar-7').addEventListener('click', function () {
    guardarRespuesta('formulario-7', 7);
});
document.getElementById('guardar-8').addEventListener('click', function () {
    guardarRespuesta('radio-8', 8);
});
document.getElementById('guardar-9').addEventListener('click', function () {
    guardarRespuesta('respuesta-9', 9);
});
document.getElementById('guardar-10').addEventListener('click', function () {
    guardarRespuesta('respuesta-10', 10);
});
document.getElementById('guardar-11').addEventListener('click', function () {
    guardarRespuesta('formulario-11', 11);
});
document.getElementById('guardar-12').addEventListener('click', function () {//textarea
    guardarRespuesta('respuesta-12', 12);
});

document.getElementById('guardar-13').addEventListener('click', function () {
    guardarRespuesta('formulario-13', 13);
});

document.getElementById('guardar-14').addEventListener('click', function () {//option
    guardarRespuesta('radio-14', 14);
});

document.getElementById('guardar-15').addEventListener('click', function () {//checbox
    guardarRespuesta('formulario-15', 15);
});
document.getElementById('guardar-16').addEventListener('click', function () {
    guardarRespuesta('respuesta-16', 16);
});

document.getElementById('guardar-17').addEventListener('click', function () {//textarea
    guardarRespuesta('respuesta-17', 17);
});

document.getElementById('guardar-18').addEventListener('click', function () {//textarea
    guardarRespuesta('respuesta-18', 18);
});
document.getElementById('guardar-19').addEventListener('click', function () {//textarea
    guardarRespuesta('respuesta-19', 19);
});

})