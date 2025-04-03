// 1. Mostrar la posición del mouse en el documento
document.addEventListener('mousemove', (event) => {
    const mousePos = document.getElementById('mousePosition');
    if (mousePos) {
        mousePos.textContent = `Posición del mouse: X: ${event.clientX}, Y: ${event.clientY}`;
    }
});

// 2. Obtener nombre y apellido del formulario y mostrar el nombre completo
document.getElementById('form1').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const firstName = document.getElementById('form-fname').value;
    const lastName = document.getElementById('form-lname').value;
    const fullName = `${firstName} ${lastName}`;
    const fullNameElement = document.createElement('p');
    fullNameElement.textContent = `Nombre completo: ${fullName}`;
    // Inserta el nuevo elemento después del botón de envío
    const submitButton = document.getElementById('form1-submit');
    submitButton.parentNode.insertBefore(fullNameElement, submitButton.nextSibling);
});

// 3. Agregar una fila o una columna a la tabla "sampleTable"
// Insertar una nueva fila
document.getElementById('btn-insert-r').addEventListener('click', () => {
    const table = document.getElementById('sampleTable');
    const rowCount = table.rows.length;
    const colCount = table.rows[0].cells.length;
    const newRow = table.insertRow(rowCount);
    for (let i = 0; i < colCount; i++) {
        const newCell = newRow.insertCell(i);
        newCell.textContent = `Row ${rowCount + 1} column ${i + 1}`;
    }
});

// Insertar una nueva columna en cada fila
document.getElementById('btn-insert-c').addEventListener('click', () => {
    const table = document.getElementById('sampleTable');
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const colCount = row.cells.length;
        const newCell = row.insertCell(colCount);
        newCell.textContent = `Row ${i + 1} column ${colCount + 1}`;
    }
});

// 4. Actualizar el contenido de una celda en la tabla "myTable"
document.getElementById('btn-change').addEventListener('click', () => {
    // Se asume que el usuario ingresa índices basados en 1 (se resta 1 para acceder a la posición correcta)
    const rowIndex = parseInt(document.getElementById('rowIndex').value) - 1;
    const colIndex = parseInt(document.getElementById('colIndex').value) - 1;
    const newValue = document.getElementById('newValue').value;
    const table = document.getElementById('myTable');
    if (table.rows[rowIndex] && table.rows[rowIndex].cells[colIndex]) {
        table.rows[rowIndex].cells[colIndex].textContent = newValue;
    } else {
        alert('Índices fuera de rango');
    }
});

// 5. Agregar o quitar opciones en el select de colores
// Agregar una opción usando el valor del input (si el input está vacío se solicita ingresar un color)
document.getElementById('btn-add-color').addEventListener('click', () => {
    const inputColor = document.getElementById('colorInput').value.trim();
    if (inputColor === '') {
        alert('Por favor ingresa un color');
        return;
    }
    const select = document.getElementById('colorSelect');
    const option = document.createElement('option');
    option.text = inputColor;
    select.add(option);
});

// Quitar la opción seleccionada
document.getElementById('btn-rmv-color').addEventListener('click', () => {
    const select = document.getElementById('colorSelect');
    if (select.options.length > 0) {
        select.remove(select.selectedIndex);
    }
});

// 6. Cambiar la imagen de gato al pasar el mouse (evento mouseover)
// Se pre-carga la nueva imagen desde loremflickr para evitar el placeholder.
document.getElementById('imagenGato').addEventListener('mouseover', () => {
    const randomWidth = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    const newSrc = `https://loremflickr.com/${randomWidth}/${randomHeight}/cat?random=${Date.now()}`;
    
    const tempImg = new Image();
    tempImg.src = newSrc;
    tempImg.onload = function() {
        document.getElementById('imagenGato').src = newSrc;
    };
});