// Mapeo de los avances a las opciones
const mapeoOpciones = {
    "avance1": "opción a",
    "avance2": "opción b",
    "avance3": "opción c",
    "avance4": "opción d",
    // Agrega más mapeos según sea necesario
};

// Función reutilizable para enviar respuestas con descripción
function enviarRespuestas(idBoton, descripcion) {
    document.getElementById(idBoton).addEventListener('click', function (event) {
        event.preventDefault();  // Evita que se recargue la página al enviar el formulario

        // Recuperar las respuestas desde el localStorage
        let respuestas = JSON.parse(localStorage.getItem('unidad1-leccion1')) || {};

        // Formatear el mensaje para WhatsApp
        let mensaje = `${descripcion}:\n\n`; // Usar la descripción que se pasa como parámetro
        for (let pregunta in respuestas) {
            let respuesta = respuestas[pregunta];
            if (Array.isArray(respuesta)) {
                // Si es un array (por ejemplo, checkboxes)
                // Reemplazar los valores de 'avance' por las opciones correspondientes
                let respuestasConOpciones = respuesta.map(val => mapeoOpciones[val] || val); // Reemplaza con el mapeo
                mensaje += `${pregunta}: ${respuestasConOpciones.join(', ')}\n............................\n`;  // Agregar línea en blanco después
            } else {
                // Si es una respuesta de texto o radio button
                mensaje += `${pregunta}: ${respuesta}\n............................\n`;  // Agregar línea en blanco después
            }
        }

        // Codificar el mensaje para URL
        mensaje = encodeURIComponent(mensaje);

        // Número de teléfono del profesor (reemplaza con el número adecuado)
        const telefonoProfesor = '1234567890';  // Asegúrate de incluir el código de país (sin el +)

        // Crear el enlace de WhatsApp
        const enlaceWhatsApp = `https://wa.me/${573150453133}?text=${mensaje}`;

        // Abrir el enlace en una nueva ventana (esto abrirá WhatsApp)
        window.open(enlaceWhatsApp, '_blank');
    });
}


document.querySelectorAll('.enviarAutoexamen').forEach(boton => {
    boton.addEventListener('click', function () {
        let idExamen = this.getAttribute('data-examen'); // Obtiene el ID del formulario
        enviarRespuestasWhatsApp(idExamen, `📋 Respuestas de ${idExamen}`);
    });
});

function enviarRespuestasWhatsApp(idExamen, titulo) {
    let mensaje = `${titulo}:\n`;
    
    // Obtener todas las preguntas dentro del formulario específico
    let preguntas = document.querySelectorAll(`#${idExamen} .question`);
    
    preguntas.forEach((pregunta, index) => {
        let numeroPregunta = index + 1;
        let opcionesSeleccionadas = [];
        
        // Buscar radios y checkboxes seleccionados dentro de la pregunta
        let seleccionados = pregunta.querySelectorAll('input:checked');
        
        seleccionados.forEach(seleccion => {
            // Obtener el label asociado al input
            let label = pregunta.querySelector(`label[for="${seleccion.id}"]`);
            let textoOpcion = label ? label.innerText.trim() : seleccion.value;
            opcionesSeleccionadas.push(textoOpcion);
        });

        // Si hay respuestas seleccionadas, agregarlas al mensaje
        if (opcionesSeleccionadas.length > 0) {
            mensaje += `*Pregunta ${numeroPregunta} :* \n${opcionesSeleccionadas.join(" \n............................\n")}\n............................\n\n............................\n`;
        }
    });

    // Número de WhatsApp del profesor (cambia esto por el número correcto con código de país)
    let numeroProfesor = "573150453133"; 
    
    // Crear enlace de WhatsApp con el mensaje codificado correctamente
    let url = `https://wa.me/${numeroProfesor}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(url, '_blank');
}


// Asocia cada botón a la función reutilizable con una descripción específica
enviarRespuestas('enviar_respuestas1', "Envío las respuestas de la Unidad 1 Lección 1");
enviarRespuestas('enviar_respuestas2', "Envío las respuestas de la Unidad 1 Lección 2");

//enviar autoexamen

