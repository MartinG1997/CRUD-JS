
# Proyecto 2: Aplicación CRUD



## Índice

* [1. Introducción](#Introducción)
* [2. Demo](#Demo)
* [3. ¿Qué es?](#¿Qué-es?)
* [4. Objetivos de aprendizaje](#Objetivos-de-aprendizaje)
* [5. Requisitos](#Requisitos)
* [6. Agradecimientos](#Agradecimientos)
## Introducción

Con la finalidad de seguir aprendiendo un poco de desarrollo FullStack, uno se encuentra con los llamados procesos CRUD, operaciones que trabajan con datos para persistirlos en una base de datos. A falta de esta, se utiliza el llamado localStorage, que permite persistir los datos de forma local, o sea, en el navegador del computador del usuario.

Esto sirve para facilitar vistas, búsqueda y modificación de información.

CRUD es un acrónimo para Create, Read, Update, Delete.
## Demo

Puedes entrar a ver el demo aquí: https://marting1997.github.io/CRUD-JS/


En este caso se desarrolló una aplicación para el cálculo del sueldo bruto teniendo el líquido, en la cual se requiere un CRUD.

En ella se tienen los siguientes puntos:

- Se pueden crear personas con sus sueldos con **Guardar**, para ello hay que agregar los campos Nombre, Apellido, Monto y la lista con las AFPs.
- Si no se agrega ningún registro nuevo, con el botón **Cargar** se cargarán todos los datos almacenados en localStorage.
- Con el botón **Editar** se cargarán en los campos superiores los datos básicos y se podrá actualizar dicha información con el botón **Actualizar**.
-  Borrar registro o tabla completa, con el botón **Eliminar** se eliminará el registro seleccionado y con **Limpiar** se borrarán todos los registros.

## ¿Qué es?

Como se mencionó, lo que busca esta aplicación es calcular a raíz del sueldo líquido el bruto. Para ello hay que tener ciertas nociones.

- Lo primero que hay que tener en consideración es que este proyecto está pensando para los sueldos de Chile.
- Posterior a ello, en Chile existen los siguientes descuentos legales: Seguro de cesantía, FONASA (Salud), AFPs (Sistema de ahorro para pensión.)
- Por último, estos descuentos tienen valores asociados. El seguro de cesantía para trabajadores antiguos es del 0.6%, FONASA del 7% y la AFP varía según en el cual el trabajador esté inscrito.
## Objetivos de aprendizaje

- Aplicar operaciones CRUD en un segmento de datos.
- Puesta a prueba de conocimientos base.
- Extra: Utilizar una API.
## Requisitos

Esta aplicación puede correr de forma local en un computador, no requiere ninguna descarga de ningún software, además, para su uso estará disponible el link para probarlo sin restricciones.
## Agradecimientos

Finalmente quiero hacer un especial agredicimientos a:

- **[Bootcamp Desarrollador FullStack UDD](https://github.com/UDDBootcamp)** : Por el buen material de sus cursos y la exigencia que pone para aprobar.

- **[Bryan Diaz C](https://github.com/brayandiazc)** : Profesor del Bootcamp.

- **[Gael Cloud](https://api.gael.cloud/#introduccion)** : Por sus API, en especial para este proyecto la de indicadores previsionales.