function guardarDatos() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;

  if (nombre && apellido) {
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    var datoExistente = false;

    for (var i = 0; i < datosGuardados.length; i++) {
      if (datosGuardados[i].nombre === nombre && datosGuardados[i].apellido === apellido) {
        datosGuardados[i].nombre = nombre;
        datosGuardados[i].apellido = apellido;
        datoExistente = true;
        break;
      }
    }

    if (!datoExistente) {
      datosGuardados.push({ nombre: nombre, apellido: apellido });
    }

    localStorage.setItem('datos', JSON.stringify(datosGuardados));
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    cargarDatos();
  }
}

function cargarDatos() {
  var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
  var tabla = document.getElementById('tablaDatos');
  var tbody = tabla.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';

  datosGuardados.forEach(function (dato, index) {
    var fila = document.createElement('tr');
    var celdaNombre = document.createElement('td');
    var celdaApellido = document.createElement('td');
    var celdaEditar = document.createElement('td');
    var botonEditar = document.createElement('button');

    celdaNombre.textContent = dato.nombre;
    celdaApellido.textContent = dato.apellido;

    botonEditar.textContent = 'Editar';
    botonEditar.addEventListener('click', function () {
      editarDato(index); // Pasamos el índice del dato a editar
    });

    celdaEditar.appendChild(botonEditar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaEditar);

    tbody.appendChild(fila);
  });
}

function editarDato(index) {
  var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
  var dato = datosGuardados[index];

  if (dato) {
    document.getElementById('nombre').value = dato.nombre;
    document.getElementById('apellido').value = dato.apellido;
  }
  document.getElementById('Id').value = index;
  alert(index);
}

function DeleteSaveData() {
    localStorage.clear();
}

function SaveNewData() {
  index = document.getElementById("Id").value;
  var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  alert(index + nombre);
  datosGuardados[index]={ nombre: nombre, apellido: apellido }
  localStorage.setItem('datos', JSON.stringify(datosGuardados));
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    cargarDatos();
  //document.getElementById('apellido').value = dato.apellido;
}