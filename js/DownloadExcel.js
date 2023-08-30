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
            "Bono+hextras+sueldo",
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
                (dato.sueldo_mes+dato.hextras+dato.bonificacion-dato.gratificacion),
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