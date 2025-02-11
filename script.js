document.getElementById('add-entry').addEventListener('click', function() {
    // Obtener los valores del formulario
    const clientId = document.getElementById('client-id').value;
    const workOrder = document.getElementById('work-order').value;
    const saleDate = document.getElementById('sale-date').value; // Obtener la fecha de venta
    const serviceSelect = document.getElementById('service');
    const selectedService = serviceSelect.options[serviceSelect.selectedIndex];
    const serviceName = selectedService.value;
    const servicePrice = parseFloat(selectedService.getAttribute('data-price'));

    // Verificar si todos los campos están completos
    if (!clientId || !workOrder || !serviceName || !saleDate) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear una nueva fila en la tabla
    const tableBody = document.getElementById('report-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();

    // Insertar las celdas de la fila
    const cellClientId = newRow.insertCell(0);
    const cellWorkOrder = newRow.insertCell(1);
    const cellSaleDate = newRow.insertCell(2); // Nueva celda para la fecha
    const cellService = newRow.insertCell(3);
    const cellPrice = newRow.insertCell(4);
    const cellDelete = newRow.insertCell(5);

    // Asignar los valores a las celdas
    cellClientId.textContent = clientId;
    cellWorkOrder.textContent = workOrder;
    cellSaleDate.textContent = saleDate; // Mostrar la fecha de venta
    cellService.textContent = serviceName;
    cellPrice.textContent = servicePrice.toFixed(4); // Mostrar el precio con 4 decimales

    // Agregar el botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    cellDelete.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        newRow.remove();
        updateTotal();
    });

    // Limpiar los campos del formulario
    document.getElementById('client-id').value = '';
    document.getElementById('work-order').value = '';
    document.getElementById('sale-date').value = ''; // Limpiar el campo de fecha
    document.getElementById('service').selectedIndex = 0;

    // Actualizar el total
    updateTotal();

    // Mostrar notificación breve
    const notification = document.createElement('div');
    notification.textContent = 'Entrada agregada exitosamente';
    notification.classList.add('notification');
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
});

// Función para actualizar el total
function updateTotal() {
    let total = 0;
    
    // Obtener todas las filas de la tabla y sumar los precios
    const rows = document.getElementById('report-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const price = parseFloat(rows[i].cells[4].textContent); // Actualizar el índice de la celda de precio
        total += price;
    }

    // Mostrar el total con 4 decimales
    document.getElementById('total-price').textContent = `$${total.toFixed(4)}`;
}
document.getElementById('theme-switch').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

// Exportar a CSV
document.getElementById('export-csv').addEventListener('click', function() {
    const rows = document.getElementById('report-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let csvContent = "ID Cliente,Orden de Trabajo,Servicio,Precio,Fecha\n"; // Encabezados del CSV
    
    if (rows.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const clientId = row.cells[0].textContent;
        const workOrder = row.cells[1].textContent;
        const serviceName = row.cells[3].textContent;
        const servicePrice = row.cells[4].textContent;
        const saleDate = row.cells[2].textContent;

        // Agregar la fila de datos al CSV
        csvContent += `${clientId},${workOrder},${serviceName},${servicePrice},${saleDate}\n`;
    }

    // Crear un enlace para la descarga del CSV
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'reporte_ventas.csv'; // Nombre del archivo CSV
    link.click();
});


    



