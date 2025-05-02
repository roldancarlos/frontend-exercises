const menuButtons = document.querySelectorAll('.menu');
const allLines = document.querySelectorAll('.line');
let lastOpened = null; // Para llevar el control de la línea abierta

menuButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = button.getAttribute('data-target');
        const targetLine = document.getElementById(targetId);
        const targetContainer = document.getElementById(targetId + 'container'); // Contenedor de contenido

        // Si se hace clic en la misma línea abierta, la cerramos
        if (lastOpened === targetLine) {
            targetLine.classList.remove('open'); // Cerrar animación
            targetContainer.innerHTML = ''; // Borrar contenido
            lastOpened = null;
            return;
        }

        // Cerrar todas las líneas
        allLines.forEach(line => {
            line.classList.remove('open'); // Remover clase 'open' de todas las líneas
            document.getElementById(line.id + 'container').innerHTML = ''; // Limpiar contenido
        });

        // Abrir la línea correspondiente
        targetLine.classList.add('open'); // Agregar clase 'open' para animar la apertura

        // Insertar contenido dependiendo del botón presionado
        if (targetId === 'line1') {
            targetContainer.innerHTML = `
                <div class="whoiam">
                    <div class="nombreyfoto">
                        <p class="nombre">CARLOS ROLDÁN</p>
                        <img src="cara.svg" alt="Foto de Carlos Roldán">
                    </div>
                    <div class="descripcion">
                        <p class="biografia">
                            <b>Carlos Roldán</b> <i>"rold&"</i> es un desarrollador front-end e ingeniero de sonido que fusiona tecnología y arte.
                            <br>Crea experiencias digitales que no solo funcionan, sino que sienten.
                            <br>Su enfoque combina precisión técnica y una visión creativa para transformar cada proyecto en algo único.
                        </p>
                    </div>
                </div>
            `;
        } else if (targetId === 'line2') {
            targetContainer.innerHTML = `
            <div class="stack">
                <p class="ache">HTML5</p>
                <p class="cese">CSS</p>
                <p class="javascri">JAVASCRIPT</p>
                <p class="pyton">PYTHON</p>
                <p class="photoshop">Adobe PHOTOSHOP</p>
                <p class="illustrator">Adobe ILLUSTRATOR</p>
                <p class="figma">FIGMA</p>
                <p class="ableton">Git/Github</p>
            </div>
            `;
        } else if (targetId === 'line3') {
            targetContainer.innerHTML = `
            <div class=softSkills>
                <p>En el desarrollo de interfaces y experiencias interactivas, destaco por una alta capacidad de resolución de problemas, especialmente en entornos dinámicos y con requisitos cambiantes. 
                <br>La formación en producción musical y diseño de sonido aporta una sensibilidad especial para el detalle, la estructura y la armonía en productos digitales. La creatividad se traduce en soluciones innovadoras, manteniendo siempre un enfoque centrado en el usuario y la eficiencia del flujo de trabajo.</p>
                </div>`;
        } else if (targetId === 'line4') {
            targetContainer.innerHTML = `
                <p>Contenido sobre About...</p>
            `;
        }

        lastOpened = targetLine;
    });
});
