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
    var gratificacion;                                                              //La gratificacion ++
    switch(true){
        case (monto_esperado*0.4 <= 158333):
            gratificacion = monto_esperado*0.4;
            break;
        case (monto_esperado*0.4 >= 158333):
            gratificacion = 158333;
            break;
    }
    var sueldo_imponible = (sueldo_mes+bonificacion+gratificacion+hextras);                 //Sueldo Imponible ++
    var montoAFP = ((sueldo_imponible * porcentaje_afp) / 100).toFixed(2);                  //Monto AFP ++
    var montoFONASA = (sueldo_imponible * 0.07).toFixed(2);                                 //Monto FONASA ++
    var montoSeguro = (sueldo_imponible*0.006).toFixed(2);                                  // Monto Seguro ++ (arreglar para que funcione para faena o contrata)
    var sueldo_liquido_sin_ni = sueldo_imponible - montoAFP - montoFONASA - montoSeguro;    // Sueldo liquido sin no imponibles ++
    var descuentos = document.getElementById("descuentos").value;                           //Descuentos ++
    var movilizacion = document.getElementById("movilizacion").value;                       //Movilizacion ++
    var cargafamiliar = document.getElementById("cargafamiliar").value;                     // carga familiar
    var montocargafamiliar = 0;                                                                 //Monto carga familiar ++
    switch(true){
        case (sueldo_liquido_sin_ni <= 429899):
            montocargafamiliar = cargafamiliar*16828;
            break;
        case (sueldo_liquido_sin_ni > 429899 & sueldo_liquido_sin_ni <= 627913):
            montocargafamiliar = cargafamiliar*10327;
            break;
        case (sueldo_liquido_sin_ni > 627913 & sueldo_liquido_sin_ni <= 979330):
            montocargafamiliar = cargafamiliar*3264;
            break;
    }
    var costo_empleado = sueldo_liquido_sin_ni + movilizacion + montocargafamiliar - descuentos; //Monto Sueldo total Empleado ++

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
            descuentos: descuentos,
            movilizacion: movilizacion,
            cargafamiliar: cargafamiliar,
            montocargafamiliar: montocargafamiliar,
            costo_empleado, costo_empleado
        };
        localStorage.setItem("datos", JSON.stringify(datosGuardados));
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("dias").value = "";
        document.getElementById("hextras").value = "";
        document.getElementById("monto").value = "";
        document.getElementById("indicadores").value = "";
        document.getElementById("Id").value = "";
        document.getElementById("descuentos").value = "";
        document.getElementById("movilizacion").value = "";
        document.getElementById("cargafamiliar").value = "";

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
            descuentos: descuentos,
            movilizacion: movilizacion,
            cargafamiliar: cargafamiliar,
            montocargafamiliar: montocargafamiliar,
            costo_empleado, costo_empleado
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
        document.getElementById("descuentos").value = "";
        document.getElementById("movilizacion").value = "";
        document.getElementById("cargafamiliar").value = "";
        console.log(nombre)
        console.log(apellido)
        console.log(dias_trabajados)
        console.log(sueldo_base)
        console.log(hextras)
        console.log(monto_esperado)
        console.log(afp)
        console.log(porcentaje_afp)
        console.log(sueldo_mes)
        console.log(bonificacion)
        console.log(gratificacion)
        console.log(sueldo_imponible)
        console.log(montoAFP)
        console.log(montoFONASA)
        console.log(montoSeguro)
        console.log(sueldo_liquido_sin_ni)
        console.log(descuentos)
        console.log(movilizacion)
        console.log(cargafamiliar)
        console.log(montocargafamiliar)
        console.log(costo_empleado)

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
            <td>${Intl.NumberFormat().format( dato.movilizacion )}</td>
            <td>${Intl.NumberFormat().format( dato.montocargafamiliar )}</td>
            <td>${Intl.NumberFormat().format( dato.descuentos )}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_liquido_sin_ni )}</td>
            <td>${Intl.NumberFormat().format( dato.costo_empleado )}</td>
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
                dato.monto_esperado,
                dato.afp,
                dato.porcentaje_afp,
                dato.montoReal,
                dato.montoAFP,
                dato.montoFONASA,
                dato.montoSeguro,
                dato.sueldo_base,
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
