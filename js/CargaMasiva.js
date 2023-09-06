function leerArchivoExcel() 
{
    const archivo = document.querySelector('input[type=file]').files[0];
    const lector = new FileReader();

    lector.onload = function (evento) 
    {
        const data = new Uint8Array(evento.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
  
        const primeraHoja = workbook.SheetNames[0];
        const datos = XLSX.utils.sheet_to_json(workbook.Sheets[primeraHoja]);
        for (let i = 0; i < datos.length; i++) 
        {
            const primeraColumna = datos[i].Dias_trabajados; // Reemplaza 'Nombre de la columna' con el nombre real de la primera columna
            if (Object.values(nombresAFP).includes(datos[i].AFP)) 
            {
                var claveAFP = Object.keys(nombresAFP).find(function(key) 
                {
                return nombresAFP[key] === datos[i].AFP;
                });
                var valorAFP = nombresAFP[claveAFP];
                nombre = datos[i].Nombre;
                apellidos = datos[i].Apellidos;
                dias_trabajados = datos[i].Dias_trabajados;
                sueldo_base = datos[i].Sueldo_Base;
                if(datos[i].Horas_Extras = '')
                {
                    hextras = 0;
                }
                else{
                    hextras = datos[i].Horas_Extras;
                }
                total_trato = datos[i].Total_Trato;
                movilizacion = datos[i].Movilizacion;
                tipo_contrato = datos[i].Tipo_Contrato;
                Insert(nombre, apellidos, dias_trabajados, sueldo_base, hextras, total_trato, movilizacion, tipo_contrato, valorAFP);
            }
            //console.log(primeraColumna);
        }
        //console.log(datos);
    };

    lector.readAsArrayBuffer(archivo);
    document.getElementById("CargaMasiva").value = '';
    LoadData()
}