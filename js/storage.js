function SaveData() 
{
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
  
    if (nombre && apellido) 
    {
      // Obtener los datos existentes en LocalStorage
      var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
  
      // Agregar el nuevo dato al array
      datosGuardados.push({ nombre: nombre, apellido: apellido });
  
      // Guardar el array actualizado en LocalStorage
      localStorage.setItem('datos', JSON.stringify(datosGuardados));
  
      // Limpiar los campos de entrada
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
  
      // Actualizar la tabla
      LoadData();
    }
}
  
function LoadData() 
{
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    var tabla = document.getElementById('tablaDatos');
    var tbody = tabla.getElementsByTagName('tbody')[0];
  
    tbody.innerHTML = '';
  
    datosGuardados.forEach(function (dato, index) 
    {
        var fila = document.createElement('tr');
        var celdaNombre = document.createElement('td');
        var celdaApellido = document.createElement('td');
        var celdaEditar = document.createElement('td');
        var botonEditar = document.createElement('button');
        var btnDelete = document.createElement('button');

        celdaNombre.textContent = dato.nombre;
        celdaApellido.textContent = dato.apellido;
    
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', function () 
        {
            EditData(index); // Pasamos el índice del dato a editar
        });

        btnDelete.textContent = 'Eliminar';
        btnDelete.addEventListener('click', function () 
        {
            DeleteData(index); // Pasamos el índice del dato a editar
        });
  
        celdaEditar.appendChild(botonEditar);
        celdaEditar.appendChild(btnDelete);
  
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaEditar);
  
        tbody.appendChild(fila);
    });
}

function EditData(index) 
{
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    var dato = datosGuardados[index];
  
    if (dato) {
      document.getElementById('nombre').value = dato.nombre;
      document.getElementById('apellido').value = dato.apellido;
    }
    document.getElementById('Id').value = index;
}

function DeleteData(index)
{
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    delete(datosGuardados[index]);
    localStorage.setItem('datos', JSON.stringify(datosGuardados));
    LoadData();
}

function UpdateData()
{
    index = document.getElementById('Id').value;
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    datosGuardados[index]={ nombre: nombre, apellido: apellido }
    localStorage.setItem('datos', JSON.stringify(datosGuardados));
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    LoadData();
}
  