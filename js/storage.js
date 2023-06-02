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
    var porcentajeafp = parseFloat(selectList.value.replace(',', '.'));
    var montoReal = ((monto*100)/(100-7-porcentajeafp)).toFixed(2);
    var montoAFP = ((montoReal*porcentajeafp)/100).toFixed(2);
    var montoFONASA = (montoReal*0.07).toFixed(2);

    if (nombre && apellido && monto && selectList) 
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
    else
    {
        alert('Falta asignar valor a uno de los siguientes campos: \n 1. Nombre \n 2. Apellido \n 3. Monto \n 4. Lista de AFPs');
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
      document.getElementById('monto').value = dato.monto;
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
    const selectList = document.getElementById("indicadores");
    if(selectList.value != '')
    {
        index = document.getElementById('Id').value;
        var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var monto = document.getElementById('monto').value;
        var afp = selectList.options[selectList.selectedIndex].textContent;
        var porcentajeafp = parseFloat(selectList.value.replace(',', '.'));
        var montoReal = ((monto*100)/(100-7-porcentajeafp)).toFixed(2);
        var montoAFP = ((montoReal*porcentajeafp)/100).toFixed(2);
        var montoFONASA = (montoReal*0.07).toFixed(2);

        datosGuardados[index]={ nombre: nombre, apellido: apellido, monto: monto, afp: afp, porcentajeafp: porcentajeafp, montoReal: montoReal, montoAFP: montoAFP, montoFONASA: montoFONASA};
        localStorage.setItem('datos', JSON.stringify(datosGuardados));
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('monto').value = '';
        document.getElementById('indicadores').value = '';

        LoadData();
    }
    else
    {
        alert('Falta asignar valor a uno de los siguientes campos: \n 1. Nombre \n 2. Apellido \n 3. Monto \n 4. Lista de AFPs');
    }
}

function Clean()
{
    localStorage.clear();
    LoadData();
}

function descargarExcel() {
    var datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
  
    if (datosGuardados.length === 0) {
      alert("No hay datos guardados para descargar.");
      return;
    }
  
    var datos = [['Nombre', 'Apellido', 'Sueldo Bruto', 'AFP', 'Porcentaje AFP', 'Sueldo Liquido', 'Monto AFP', 'Monto FONASA']].concat(datosGuardados.map(function(dato) {
      return [dato.nombre, dato.apellido, dato.monto, dato.afp, dato.porcentajeafp, dato.montoReal, dato.montoAFP, dato.montoFONASA];
    }));
  
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  
    var libroBinario = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
  
    var archivoExcel = new Blob([s2ab(libroBinario)], { type: "application/octet-stream" });
  
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(archivoExcel);
    enlaceDescarga.download = "datos.xlsx";
    enlaceDescarga.click();
  }
  
  
  