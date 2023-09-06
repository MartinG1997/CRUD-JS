var nombresAFP = {
    AFPCapitalTasaDep: "Capital",
    AFPCuprumTasaDep: "Cuprum",
    AFPHabitatTasaDep: "Habitat",
    AFPPlanVitalTasaDep: "Plan Vital",
    AFPProVidaTasaDep: "Provida",
    AFPModeloTasaDep: "Modelo",
    AFPUnoTasaDep: "Uno"
};

// Función para traer la API de gael.cloud, la cual cotiene los datos de previred actualizados y se trae en forma de JSON.
$(document).ready(function () {
    // Objeto para mapear las claves a los nombres deseados

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
    var monto_esperado = document.getElementById("monto").value;                    //Es el sueldo liquido esperado.
    const selectList = document.getElementById("indicadores");
    var afp = selectList.options[selectList.selectedIndex].textContent;             //AFP inscrito
    var porcentaje_afp = parseFloat(selectList.value.replace(",", "."));            //Cambia la com del valor por un punto para efectuar operaciones ++
    var sueldo_mes = (sueldo_base/30)*dias_trabajados;                              //Es el sueldo ganado en base a los días trabajados ++
    var porcentaje_cesantia = document.getElementById("tipocontrato").value;
    var movilizacion = document.getElementById("movilizacion").value;                       //Movilizacion ++
    var sueldo_bruto = ((monto_esperado - movilizacion)*100)/(100-7-porcentaje_afp-(porcentaje_cesantia*100));  // Sueldo Bruto -(porcentaje_cesantia*100)
    var gratificacion = Gratificación(sueldo_bruto);                                                              //La gratificacion ++
    var bonificacion = (sueldo_bruto-gratificacion-sueldo_mes-hextras);                                 //Es el valor extra para llegar al monto deseado ++
    var montoAFP = ((sueldo_bruto * porcentaje_afp) / 100).toFixed(2);                  //Monto AFP ++
    var montoFONASA = (sueldo_bruto * 0.07).toFixed(2);                                 //Monto FONASA ++
    var montoSeguro = (sueldo_bruto*document.getElementById("tipocontrato").value).toFixed(2);                                 // Monto Seguro ++ (arreglar para que funcione para faena o contrata)
    var cesantia = 0;
    switch(true) {

        case(document.getElementById("tipocontrato").options[document.getElementById("tipocontrato").selectedIndex].textContent == 'No aplica'):
            cesantia= 0;
            break;
        case(document.getElementById("tipocontrato").value == 0):
            cesantia = sueldo_bruto*0.03;
            break;
        case(document.getElementById("tipocontrato").value ==  0.006):
            cesantia = sueldo_bruto*0.024;
            break;
    }
    //var costoe = parseInt(costo_empleado)+cesantia;

    //Se simplifica codigo, en vez de crear un Update igual al SaveData, se decide eliminar, dado que de la l28 a la 42 eran exactamente iguales
    //Es mejor evaluar si esta o no el Id
    if(id >= 0 && id !="" && selectList.value != "")
    {
        var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
        datosGuardados[id] = {
            nombre,
            apellido,
            dias_trabajados,
            sueldo_base,
            hextras,
            monto_esperado,
            afp,
            porcentaje_afp,
            sueldo_mes,
            sueldo_bruto,
            bonificacion,
            gratificacion,
            montoAFP,
            montoFONASA,
            montoSeguro,
            movilizacion,
            cesantia,

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
            nombre,
            apellido,
            dias_trabajados,
            sueldo_base,
            hextras,
            monto_esperado,
            afp,
            porcentaje_afp,
            sueldo_mes,
            sueldo_bruto,
            bonificacion,
            gratificacion,
            montoAFP,
            montoFONASA,
            montoSeguro,
            movilizacion,
            cesantia,
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
        case (monto <= 870830):
            gratificacion = monto-((monto*100)/125);
            return gratificacion;
        case (monto > 870830):
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
            <td>${Intl.NumberFormat().format( dato.bonificacion )}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_mes+dato.hextras+dato.bonificacion )}</td>
            <td>${Intl.NumberFormat().format( dato.gratificacion )}</td>
            <td>${Intl.NumberFormat().format( dato.sueldo_bruto )}</td>
            <td>${dato.afp}</td>
            <td>${dato.porcentaje_afp}</td>
            <td>${Intl.NumberFormat().format( dato.montoAFP )}</td>
            <td>${Intl.NumberFormat().format( dato.montoFONASA )}</td>
            <td>${Intl.NumberFormat().format( dato.montoSeguro )}</td>
            <td>${Intl.NumberFormat().format( dato.cesantia )}</td>
            <td>${Intl.NumberFormat().format( dato.movilizacion )}</td>
            <td>${Intl.NumberFormat().format( dato.monto_esperado )}</td>
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
        document.getElementById("dias").value = dato.dias_trabajados;
        document.getElementById("base").value = dato.sueldo_base;
        document.getElementById("hextras").value = dato.hextras
        document.getElementById("monto").value = dato.monto_esperado;
        //document.getElementById("indicadores").textContent = dato.afp;
        document.getElementById("movilizacion").value = dato.movilizacion;
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

async function Insert(nombre, apellido, dias_trabajados, sueldo_base, hextra, total_trato, movilizacion, tipo_contrato, afp) {
    var porcentaje_afp;
    for (let clave in nombresAFP) {
        if (nombresAFP.hasOwnProperty(clave) && nombresAFP[clave] === afp) {
            try {
                const response = await fetch("https://api.gael.cloud/general/public/previred/072022");
                const data = await response.json();
                porcentaje_afp =parseFloat(data[clave].replace(",", "."));
            } catch (error) {
                console.log("Error al obtener los datos de la API:", error);
            }
            hextras = ((sueldo_base/30)*(7/45)*1.5)*parseFloat(hextra);
            sueldo_mes = (sueldo_base/30)*dias_trabajados;
            switch(tipo_contrato)
            {
                case 'Obra':
                    porcentaje_cesantia = 0;
                    break;
                case 'Indefinido':
                    porcentaje_cesantia = 0.006;
                    break;
                case 'No aplica':
                    porcentaje_cesantia = 0;
                    break;
            }
            var monto_esperado = total_trato;
            var sueldo_bruto = ((total_trato - movilizacion)*100)/(100-7-porcentaje_afp-(porcentaje_cesantia*100));
            var gratificacion = Gratificación(sueldo_bruto);
            var bonificacion = (sueldo_bruto-gratificacion-sueldo_mes-hextras);
            var montoAFP = ((sueldo_bruto * porcentaje_afp) / 100).toFixed(2);
            var montoFONASA = (sueldo_bruto * 0.07).toFixed(2);
            var montoSeguro = (sueldo_bruto*porcentaje_cesantia).toFixed(2);
            var cesantia = 0;
            switch(tipo_contrato) {

                case 'No aplica':
                    cesantia= 0;
                break;
                case 'Obra':
                    cesantia = sueldo_bruto*0.03;
                    break;
                case 'Indefinido':
                    cesantia = sueldo_bruto*0.024;
                break;
            }
            if (nombre != "" && apellido != "") {
                // Obtener los datos existentes en LocalStorage
                var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
                // Agregar el nuevo dato al array
                datosGuardados.push({
                    nombre,
                    apellido,
                    dias_trabajados,
                    sueldo_base,
                    hextras,
                    monto_esperado,
                    afp,
                    porcentaje_afp,
                    sueldo_mes,
                    sueldo_bruto,
                    bonificacion,
                    gratificacion,
                    montoAFP,
                    montoFONASA,
                    montoSeguro,
                    movilizacion,
                    cesantia,
                });
        
                // Guardar el array actualizado en LocalStorage
                localStorage.setItem("datos", JSON.stringify(datosGuardados));
            }
        }
    }
    //console.log("El valor porcentual es: " + porcentajeAFP);
}