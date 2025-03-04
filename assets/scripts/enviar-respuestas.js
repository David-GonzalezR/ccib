// Mapeo de los avances a las opciones
const mapeoOpciones = {
    "avance1": "opción a",
    "avance2": "opción b",
    "avance3": "opción c",
    "avance4": "opción d",
    // Agrega más mapeos según sea necesario
};

// Función reutilizable para enviar respuestas con validación de cantidad
function enviarRespuestas(idBoton, descripcion, rango) {
    document.getElementById(idBoton).addEventListener('click', function (event) {
        event.preventDefault();  // Evita que se recargue la página al enviar el formulario

        // Recuperar las respuestas desde el localStorage
        let respuestas = JSON.parse(localStorage.getItem('unidad1-leccion1')) || {};

        // Obtener los límites del rango
        let [inicio, fin] = rango;
        let totalEsperado = fin - inicio + 1; // Número total de respuestas esperadas

        // Filtrar las respuestas que están dentro del rango
        let respuestasFiltradas = {};
        let contadorRespuestas = 0;

        for (let i = inicio; i <= fin; i++) {
            if (respuestas[`pregunta-${i}`] !== undefined) {
                respuestasFiltradas[i] = respuestas[`pregunta-${i}`];
                contadorRespuestas++;
            }
        }

        // Validar si se han contestado todas las preguntas en el rango
        if (contadorRespuestas < totalEsperado -1) {
            alert(`Hay preguntas que no respondiste o no guardaste, debes responder  las ${totalEsperado -1 } preguntas antes de enviar.`);
            
            return;
        }

        // Formatear el mensaje para WhatsApp
        let mensaje = `${descripcion}:

`;
        let numPregunta = 1;

        for (let pregunta in respuestasFiltradas) {
            let respuesta = respuestasFiltradas[pregunta];

            if (Array.isArray(respuesta)) {
                let respuestasConOpciones = respuesta.map(val => mapeoOpciones[val] || val);
                mensaje += `*Pregunta ${numPregunta}:* \n${respuestasConOpciones.join("\n............................\n")}\n............................\n\n............................\n`;
            } else {
                mensaje += `*Pregunta ${numPregunta}:* \n${respuesta}\n............................\n\n............................\n`;
            }
            numPregunta++;
        }

        // Codificar el mensaje para URL
        mensaje = encodeURIComponent(mensaje);

        // Número de teléfono del profesor
        const telefonoProfesor = '573150453133';

        // Crear el enlace de WhatsApp
        const enlaceWhatsApp = `https://wa.me/${telefonoProfesor}?text=${mensaje}`;

        // Cambiar el estado del botón a "Autoexamen enviado"
        let boton = document.getElementById(idBoton);
        boton.textContent = "Respuestas enviadas";
        boton.style.backgroundColor = "#d3d3d3"; // Gris claro
        boton.style.color = "#808080"; // Gris oscuro
        boton.disabled = true;

        // Abrir el enlace en una nueva ventana
        window.open(enlaceWhatsApp, '_blank');
    });
}






document.querySelectorAll('.enviarAutoexamen').forEach(boton => {
    boton.addEventListener('click', function () {
        let idExamen = this.getAttribute('data-examen'); // Obtiene el ID del formulario
        enviarRespuestasWhatsApp(idExamen, `📋 Respuestas de ${idExamen}`, this);
    });
});

function enviarRespuestasWhatsApp(idExamen, titulo, boton) {
    let mensaje = `${titulo}:
`;
    
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

        // Buscar los textareas dentro de la pregunta y obtener su contenido
        let textareas = pregunta.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            let respuestaTexto = textarea.value.trim();
            if (respuestaTexto) {
                opcionesSeleccionadas.push(`Respuesta escrita: ${respuestaTexto}`);
            }
        });

        // Si hay respuestas seleccionadas o texto ingresado, agregarlas al mensaje
        if (opcionesSeleccionadas.length > 0) {
            mensaje += `*Pregunta ${numeroPregunta}:* \n${opcionesSeleccionadas.join("\n............................\n")}\n............................\n\n............................\n`;
        }
    });

    // Número de WhatsApp del profesor (cambia esto por el número correcto con código de país)
    let numeroProfesor = "573150453133"; 
    
    // Crear enlace de WhatsApp con el mensaje codificado correctamente
    let url = `https://wa.me/${numeroProfesor}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(url, '_blank');

    // Cambiar estilos del botón
    boton.textContent = "Autoexamen enviado";
    boton.style.backgroundColor = "#d3d3d3"; // Gris claro
    boton.style.color = "#808080"; // Gris oscuro
    boton.disabled = true;
}



// Asocia cada botón a la función reutilizable con una descripción específica
enviarRespuestas('enviar_respuestas1', 'Respuestas de la lección 1', [0, 11]); // 11 respuestas
enviarRespuestas('enviar_respuestas2', 'Respuestas de la lección 2', [12, 30]); //18 respuestas


//enviar autoexamen

