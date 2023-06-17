// Función para traer la API de gael.cloud, la cual cotiene los datos de previred actualizados y se trae en forma de JSON.
$(document).ready(function () {
    $.getJSON(
        "https://api.gael.cloud/general/public/previred/072022",
        function (data) {
            var indicadores = [
                "AFPCapitalTasaDep",
                "AFPCuprumTasaDep",
                "AFPHabitatTasaDep",
                "AFPPlanVitalTasaDep",
                "AFPProVidaTasaDep",
                "AFPModeloTasaDep",
                "AFPUnoTasaDep",
            ];
            //Recorre data para para armar un select list con value y key
            $.each(data, function (key, value) {
                if (indicadores.includes(key)) {
                    $("#indicadores").append(
                        "<option value='" + value + "'>" + key + "</option>"
                    );
                }
            });
        }
    );
});

function SaveData() {
    var id = document.getElementById("Id").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var monto = document.getElementById("monto").value;
    const selectList = document.getElementById("indicadores");
    var afp = selectList.options[selectList.selectedIndex].textContent;
    var porcentajeafp = parseFloat(selectList.value.replace(",", "."));
    var montoReal = ((monto * 100) / (100 - 7 - porcentajeafp - 0.6)).toFixed(2);
    var montoAFP = ((montoReal * porcentajeafp) / 100).toFixed(2);
    var montoFONASA = (montoReal * 0.07).toFixed(2);
    var montoSeguro = (montoReal*0.006).toFixed(2);
    var sueldobase = document.getElementById("base").value;
    var diastrabajados = document.getElementById("dias").value;
    var monto1 = (sueldobase/30)*diastrabajados;
    var agregar = (monto-monto1);

    //Se simplifica codigo, en vez de crear un Update igual al SaveData, se decide eliminar, dado que de la l28 a la 42 eran exactamente iguales
    //Es mejor evaluar si esta o no el Id
    if(id >= 0 && id !="" && selectList.value != "")
    {
        var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
        datosGuardados[id] = {
            nombre: nombre,
            apellido: apellido,
            monto: monto,
            afp: afp,
            porcentajeafp: porcentajeafp,
            montoReal: montoReal,
            montoAFP: montoAFP,
            montoFONASA: montoFONASA,
            montoSeguro: montoSeguro,
            sueldobase: sueldobase,
            diastrabajados: diastrabajados,
            monto1: monto1,
            agregar: agregar
        };
        localStorage.setItem("datos", JSON.stringify(datosGuardados));
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("monto").value = "";
        document.getElementById("indicadores").value = "";
        document.getElementById("Id").value = "";

        LoadData();
        return 0;
    }

    if (nombre != "" && apellido != "" && monto != "" && selectList.value != "") {
        // Obtener los datos existentes en LocalStorage
        var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
        // Agregar el nuevo dato al array
        datosGuardados.push({
            nombre: nombre,
            apellido: apellido,
            monto: monto,
            afp: afp,
            porcentajeafp: porcentajeafp,
            montoReal: montoReal,
            montoAFP: montoAFP,
            montoFONASA: montoFONASA,
            montoSeguro: montoSeguro,
            sueldobase: sueldobase,
            diastrabajados: diastrabajados,
            monto1: monto1,
            agregar: agregar
        });

        // Guardar el array actualizado en LocalStorage
        localStorage.setItem("datos", JSON.stringify(datosGuardados));

        // Limpiar los campos de entrada
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("monto").value = "";
        document.getElementById("indicadores").value = "";

        // Actualizar la tabla
        LoadData();
    } else {
        alert(
            "Falta asignar valor a uno de los siguientes campos: \n 1. Nombre \n 2. Apellido \n 3. Monto \n 4. Lista de AFPs"
        );
    }
}

function LoadData() {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    var tabla = document.getElementById("tablaDatos");
    var tbody = tabla.getElementsByTagName("tbody")[0];
    tabla.classList.remove("oculto");
    tbody.innerHTML = "";

    datosGuardados.forEach(function (dato, index) {
        var fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.sueldobase}</td>
            <td>${dato.diastrabajados}</td>
            <td>${dato.monto1}</td>
            <td>${dato.agregar}</td>
            <td>${dato.monto}</td>
            <td>${dato.afp}</td>
            <td>${dato.porcentajeafp}</td>
            <td>${dato.montoReal}</td>
            <td>${dato.montoAFP}</td>
            <td>${dato.montoFONASA}</td>
            <td>${dato.montoSeguro}</td>
            <td>
                <button onclick="EditData(${index})">Editar</button>
                <button onclick="DeleteData(${index})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(fila);
    });
}


function EditData(index) {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    var dato = datosGuardados[index];

    if (dato) {
        document.getElementById("nombre").value = dato.nombre;
        document.getElementById("apellido").value = dato.apellido;
        document.getElementById("monto").value = dato.monto;
    }
    document.getElementById("Id").value = index;
}

function DeleteData(index) {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    datosGuardados.splice(index, 1);
    localStorage.setItem("datos", JSON.stringify(datosGuardados));
    LoadData();
}

function Clean() {
    localStorage.clear();
    LoadData();
}

function descargarExcel() {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];

    if (datosGuardados.length === 0) {
        alert("No hay datos guardados para descargar.");
        return;
    }

    var datos = [
        [
            "Nombre",
            "Apellido",
            "Sueldo Bruto",
            "AFP",
            "Porcentaje AFP",
            "Sueldo Liquido",
            "Monto AFP",
            "Monto FONASA",
            "Seguro de Cesantía",
            "Sueldo Base"
        ],
    ].concat(
        datosGuardados.map(function (dato) {
            return [
                dato.nombre,
                dato.apellido,
                dato.monto,
                dato.afp,
                dato.porcentajeafp,
                dato.montoReal,
                dato.montoAFP,
                dato.montoFONASA,
                dato.montoSeguro,
                dato.sueldobase,
            ];
        })
    );

    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    var libroBinario = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }

    var archivoExcel = new Blob([s2ab(libroBinario)], {
        type: "application/octet-stream",
    });

    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(archivoExcel);
    enlaceDescarga.download = "datos.xlsx";
    enlaceDescarga.click();
}
