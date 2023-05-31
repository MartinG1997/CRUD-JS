$(document).ready(function() 
{
    $.getJSON("https://api.gael.cloud/general/public/previred/072022", function(data) 
    {
        var indicadores = ["AFPCapitalTasaDep","AFPCuprumTasaDep", "AFPHabitatTasaDep", "AFPPlanVitalTasaDep", "AFPProVidaTasaDep", "AFPModeloTasaDep", "AFPUnoTasaDep"];
        $.each(data, function(key, value) 
        {
            if (indicadores.includes(key)) 
            {
                $("#indicadores").append("<option value='" + value + "'>" + key + "</option>");
            }
        });
    });
});

function SaveData() 
{
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var monto = document.getElementById('monto').value;
    const selectList = document.getElementById("indicadores");
    var afp = selectList.options[selectList.selectedIndex].textContent;
    var porcentajeafp = parseFloat(document.getElementById("indicadores").value.replace(',', '.'));
    var montoReal = ((monto*100)/(100-7-porcentajeafp)).toFixed(2);
    var montoAFP = ((montoReal*porcentajeafp)/100).toFixed(2);
    var montoFONASA = (montoReal*0.07).toFixed(2);

    if (nombre && apellido) 
    {
      // Obtener los datos existentes en LocalStorage
      var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
      // Agregar el nuevo dato al array
      datosGuardados.push({ nombre: nombre, apellido: apellido, monto: monto, afp: afp, porcentajeafp: porcentajeafp, montoReal: montoReal, montoAFP: montoAFP, montoFONASA: montoFONASA});
  
      // Guardar el array actualizado en LocalStorage
      localStorage.setItem('datos', JSON.stringify(datosGuardados));
  
      // Limpiar los campos de entrada
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('monto').value = '';
      document.getElementById('indicadores').value = '';
  
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
        var celdaLiquido = document.createElement('td');
        var celdaAFP = document.createElement('td');
        var celdaPorcentajeAfp = document.createElement('td');
        var celdaMonto = document.createElement('td');
        var celdaMontoAfp = document.createElement('td');
        var celdaMontoFonasa = document.createElement('td');
        var celdaEditar = document.createElement('td');
        var botonEditar = document.createElement('button');
        var btnDelete = document.createElement('button');
        //img.setattribute('src', ...);

        celdaNombre.textContent = dato.nombre;
        celdaApellido.textContent = dato.apellido;
        celdaLiquido.textContent = dato.monto;
        celdaAFP.textContent = dato.afp;
        celdaPorcentajeAfp.textContent = dato.porcentajeafp;
        celdaMonto.textContent = dato.montoReal;
        celdaMontoAfp.textContent = dato.montoAFP;
        celdaMontoFonasa.textContent = dato.montoFONASA;
    
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
        fila.appendChild(celdaLiquido);
        fila.appendChild(celdaAFP);
        fila.appendChild(celdaPorcentajeAfp);
        fila.appendChild(celdaMonto);
        fila.appendChild(celdaMontoAfp);
        fila.appendChild(celdaMontoFonasa);
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

function Clean()
{
    localStorage.clear();
    LoadData();
}
  