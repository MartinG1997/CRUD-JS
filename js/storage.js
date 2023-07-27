// Función para traer la API de gael.cloud, la cual cotiene los datos de previred actualizados y se trae en forma de JSON.
$(document).ready(function () {
    // Objeto para mapear las claves a los nombres deseados
    var nombresAFP = {
        AFPCapitalTasaDep: "Capital",
        AFPCuprumTasaDep: "Cuprum",
        AFPHabitatTasaDep: "Habitat",
        AFPPlanVitalTasaDep: "Plan Vital",
        AFPProVidaTasaDep: "Provida",
        AFPModeloTasaDep: "Modelo",
        AFPUnoTasaDep: "Uno"
    };

    $.getJSON(
        "https://api.gael.cloud/general/public/previred/072022",
        function (data) {
            var indicadores = Object.keys(nombresAFP);

            // Recorre data para armar un select list con value y key
            $.each(data, function (key, value) {
                if (indicadores.includes(key)) {
                    var nombreAFP = nombresAFP[key]; // Obtiene el nombre deseado

                    $("#indicadores").append(
                        "<option value='" + value + "'>" + nombreAFP + "</option>"
                    );
                }
            });
        }
    );
});


function SaveData() {
    var id = document.getElementById("Id").value;
    var nombre = document.getElementById("nombre").value;                           //Nombre ++
    var apellido = document.getElementById("apellido").value;                       //Apelldio ++
    var dias_trabajados = document.getElementById("dias").value;                    //Días trabajados ++
    var sueldo_base = document.getElementById("base").value;                        //Es el sueldo base ++
    var hextras = ((sueldo_base/30)*(7/45)*1.5)*document.getElementById("hextras").value;    //Son las HORAS extras trabajadas ++
    var monto_esperado = document.getElementById("monto").value;                    //Es el monto esperado a llegar antes de la gratificacion y la imponibilidad ++
    const selectList = document.getElementById("indicadores");
    var afp = selectList.options[selectList.selectedIndex].textContent;
    var porcentaje_afp = parseFloat(selectList.value.replace(",", "."));            //Cambia la com del valor por un punto para efectuar operaciones ++
    var sueldo_mes = (sueldo_base/30)*dias_trabajados;                              //Es el sueldo ganado en base a los días trabajados ++
    var bonificacion = (monto_esperado-sueldo_mes);                                 //Es el valor extra para llegar al monto deseado ++
    var gratificacion = Gratificación(monto_esperado);                                                              //La gratificacion ++
    var sueldo_imponible = (sueldo_mes+bonificacion+gratificacion+hextras);                 //Sueldo Imponible ++
    var montoAFP = ((sueldo_imponible * porcentaje_afp) / 100).toFixed(2);                  //Monto AFP ++
    var montoFONASA = (sueldo_imponible * 0.07).toFixed(2);                                 //Monto FONASA ++
    var montoSeguro = (sueldo_imponible*document.getElementById("tipocontrato").value).toFixed(2);                                 // Monto Seguro ++ (arreglar para que funcione para faena o contrata)
    var sueldo_liquido_sin_ni = sueldo_imponible - montoAFP - montoFONASA - montoSeguro;    // Sueldo liquido sin no imponibles ++
    var movilizacion = document.getElementById("movilizacion").value;                       //Movilizacion ++
    var costo_empleado = sueldo_liquido_sin_ni + movilizacion;                            //Monto Sueldo total Empleado ++
    var cesantia = 0;
    switch(true) {
        case(document.getElementById("tipocontrato").value == 0):
            cesantia = sueldo_imponible*0.03;
            break;
        case(document.getElementById("tipocontrato").value ==  0.006):
            cesantia = sueldo_imponible*0.024;
            break;
    }
    var costoe = parseInt(costo_empleado)+cesantia;

    //Se simplifica codigo, en vez de crear un Update igual al SaveData, se decide eliminar, dado que de la l28 a la 42 eran exactamente iguales
    //Es mejor evaluar si esta o no el Id
    if(id >= 0 && id !="" && selectList.value != "")
    {
        var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
        datosGuardados[id] = {
            nombre: nombre,
            apellido: apellido,
            dias_trabajados: dias_trabajados,
            sueldo_base: sueldo_base,
            hextras: hextras,
            monto_esperado: monto_esperado,
            afp: afp,
            porcentaje_afp: porcentaje_afp,
            sueldo_mes: sueldo_mes,
            bonificacion: bonificacion,
            gratificacion: gratificacion,
            sueldo_imponible: sueldo_imponible,
            montoAFP: montoAFP,
            montoFONASA: montoFONASA,
            montoSeguro: montoSeguro,
            sueldo_liquido_sin_ni: sueldo_liquido_sin_ni,
            movilizacion: movilizacion,
            costo_empleado,
            cesantia,
            costoe,

        };
        localStorage.setItem("datos", JSON.stringify(datosGuardados));
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("dias").value = "";
        document.getElementById("hextras").value = "";
        document.getElementById("monto").value = "";
        document.getElementById("indicadores").value = "";
        document.getElementById("Id").value = "";
        document.getElementById("movilizacion").value = "";

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
            dias_trabajados: dias_trabajados,
            sueldo_base: sueldo_base,
            hextras: hextras,
            monto_esperado: monto_esperado,
            afp: afp,
            porcentaje_afp: porcentaje_afp,
            sueldo_mes: sueldo_mes,
            bonificacion: bonificacion,
            gratificacion: gratificacion,
            sueldo_imponible: sueldo_imponible,
            montoAFP: montoAFP,
            montoFONASA: montoFONASA,
            montoSeguro: montoSeguro,
            sueldo_liquido_sin_ni: sueldo_liquido_sin_ni,
            movilizacion: movilizacion,
            costo_empleado,
            cesantia,
            costoe,
        });

        // Guardar el array actualizado en LocalStorage
        localStorage.setItem("datos", JSON.stringify(datosGuardados));

        // Limpiar los campos de entrada
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("dias").value = "";
        document.getElementById("hextras").value = "";
        document.getElementById("monto").value = "";
        document.getElementById("indicadores").value = "";
        document.getElementById("Id").value = "";
        document.getElementById("movilizacion").value = "";

        // Actualizar la tabla
        LoadData();
    } else {
        alert(
            "Falta asignar valor a uno de los siguientes campos: \n 1. Nombre \n 2. Apellido \n 3. Monto \n 4. Lista de AFPs"
        );
    }
}

function Gratificación(monto){
    var gratificacion = 0;
    switch(true){
        case (monto*0.25 <= 174166):
            gratificacion = monto*0.25;
            return gratificacion;
        case (monto*0.25 >= 174166):
            gratificacion = 174166;
            return gratificacion;
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
            <td>${dato.dias_trabajados}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_base )}</td>
            <td>${Intl.NumberFormat().format( dato.hextras )}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_mes )}</td>
            <td>${Intl.NumberFormat().format( dato.monto_esperado )}</td>
            <td>${Intl.NumberFormat().format( dato.bonificacion )}</td>
            <td>${Intl.NumberFormat().format( dato.gratificacion )}</td>
            <td>${dato.afp}</td>
            <td>${dato.porcentaje_afp}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_imponible )}</td>
            <td>${Intl.NumberFormat().format( dato.montoAFP )}</td>
            <td>${Intl.NumberFormat().format( dato.montoFONASA )}</td>
            <td>${Intl.NumberFormat().format( dato.montoSeguro )}</td>
            <td>${Intl.NumberFormat().format( dato.cesantia )}</td>
            <td>${Intl.NumberFormat().format( dato.movilizacion )}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_liquido_sin_ni )}</td>
            <td>${Intl.NumberFormat().format( dato.costo_empleado )}</td>
            <td>${Intl.NumberFormat().format( dato.costoe )}</td>
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
        document.getElementById("monto").value = dato.monto_esperado;
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
            "Dias trabajados",
            "Sueldo base mes",
            "horas extras",
            "Sueldo mes",
            "Total trato",
            "Bono desempeño",
            "Gratificación",
            "AFP",
            "Porcentaje AFP",
            "Sueldo imponible",
            "Descuento AFP",
            "Descuento Fonasa",
            "Descuento cesantía",
            "Descuento cesantía (Empleador)",
            "Movilización",
            "Sueldo líquido",
            "Costo empleado",
            "Costo empresa",

        ],
    ].concat(
        datosGuardados.map(function (dato) {
            return [
                dato.nombre,
                dato.apellido,
                dato.dias_trabajados,
                dato.sueldo_base,
                dato.hextras,
                dato.sueldo_mes,
                dato.monto_esperado,
                dato.bonificacion,
                dato.gratificacion,
                dato.afp,
                dato.porcentaje_afp,
                dato.sueldo_imponible,
                dato.montoAFP,
                dato.montoFONASA,
                dato.montoSeguro,
                dato.cesantia,
                dato.movilizacion,
                dato.sueldo_liquido_sin_ni,
                dato.costo_empleado,
                dato.costoe,
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
