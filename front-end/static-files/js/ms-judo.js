/**
 * @file Judo.js
 * @description Funciones para el procesamiento de la info enviada por el MS Judo
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let JUDO = {};


JUDO.plantillaPersonas = {}

JUDO.personaMostrada = null

// Judo de datosDescargados vacíos
JUDO.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Alvaro Ramirez Diaz",
    email: "ard00032@red.ujaen.es",
    fecha: "16/10/00"
}

// Tags que voy a usar para sustituir los campos
JUDO.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",

}
JUDO.plantillaTagsTodos = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "DIRECCION": "### DIRECCION ###",
    "aniosActivo" : "### aniosActivo ###",
    "nTorneosDisputados" : "### nTorneosDisputados ###",
    "nTorneosGanados" : "### nTorneosGanados ###",
    "nLesiones" : "### nLesiones ###"

}



/**
 * Función que descarga la info MS Judo al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
JUDO.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Judo
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Judo
 */
JUDO.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Judo Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Judo
 */
JUDO.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos
    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos
    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos
    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Mensaje/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Judo Acerca de", mensajeAMostrar)
}




/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

JUDO.imprimePersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = JUDO.plantillaPersonas.cabecera
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += JUDO.plantillaPersonas.actualiza(e))
    msj += JUDO.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

JUDO.imprimeTodasPersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = JUDO.plantillaPersonas.cabeceraTodos
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += JUDO.plantillaPersonas.actualizaTodos(e))
    msj += JUDO.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de  todas las personas", msj)
}

JUDO.ordenaCampos = function(vector, campo){
    vector.sort(function(a,b)
     {
         let campoA = null; 
         let campoB = null;  
         
             campoA = a.data[campo].toUpperCase();
             campoB = b.data[campo].toUpperCase();
         
             if (campoA < campoB) {
                 return -1;
             }
             if (campoA > campoB) {
                 return 1;
             }
             return 0;
     });
     let msj = JUDO.plantillaPersonas.cabecera
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += JUDO.plantillaPersonas.actualizaTodos(e))
     }
     msj += JUDO.plantillaPersonas.pie
     Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
    }
    JUDO.ordenaNombre = function(vector, nombre){
        vector.sort(function(a,b)
         {
             let nombreA = null; 
             let nombreB = null;  
             
                 nombreA = a.data[nombre].toUpperCase();
                 nombreB = b.data[nombre].toUpperCase();
             
                 if (nombreA < nombreB) {
                     return -1;
                 }
                 if (nombreA > nombreB) {
                     return 1;
                 }
                 return 0;
         });
         let msj = JUDO.plantillaPersonas.cabecera
         if (vector && Array.isArray(vector)) {
             vector.forEach(e => msj += JUDO.plantillaPersonas.actualiza(e))
         }
         msj += JUDO.plantillaPersonas.pie
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
        }
    

     


//Funciones para crear una table
//Funcion para crear la cabecera de una table
JUDO.plantillaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        

                  

                    </thead>
                    <tbody>
    `;
    JUDO.plantillaPersonas.cabeceraTodos = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="20%">Direccion</th>
        <th width="20%">Años en activo</th>
        <th width="20%">Numero de torneos disputados</th>
        <th width="20%">Numero de torneos ganados</th>
        <th width="20%">Numero de lesiones</th>


    </thead>
    <tbody>
`;
JUDO.plantillaPersonas.pie = `        </tbody>
    </table>
    `;

//Cuerpo de la tabla
JUDO.plantillaPersonas.cuerpo = `
    <tr title="${JUDO.plantillaTags.NOMBRE}">
        <td>${JUDO.plantillaTags.NOMBRE}</td>
        <td>${JUDO.plantillaTags.APELLIDOS}</td>
        <td>
    </tr>
    `;
    JUDO.plantillaPersonas.cuerpoTodas = `
    <tr title="${JUDO.plantillaTagsTodos.NOMBRE}">
        <td>${JUDO.plantillaTagsTodos.NOMBRE}</td>
        <td>${JUDO.plantillaTagsTodos.APELLIDOS}</td>
        <td>${JUDO.plantillaTagsTodos.DIRECCION}</td>
        <td>${JUDO.plantillaTagsTodos.aniosActivo}</td> 
        <td>${JUDO.plantillaTagsTodos.nTorneosDisputados}</td>
        <td>${JUDO.plantillaTagsTodos.nTorneosGanados}</td>
        <td>${JUDO.plantillaTagsTodos.nLesiones}</td>
        <td>
    </tr>
    `;


/** 
* Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
* @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
* @returns La plantilla del cuerpo de la tabla con los datos actualizados
*/
JUDO.plantillaPersonas.actualiza = function (persona) {
   return JUDO.sustituyeTags(this.cuerpo, persona)
}

JUDO.plantillaPersonas.actualizaTodos = function (persona) {
    return JUDO.sustituyeTagsTodos(this.cuerpoTodas, persona)
 }

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Judo Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
JUDO.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(JUDO.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(JUDO.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(JUDO.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)



}

JUDO.sustituyeTagsTodos = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(JUDO.plantillaTagsTodos.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(JUDO.plantillaTagsTodos.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(JUDO.plantillaTagsTodos.DIRECCION, 'g'), persona.data.direccion)
        .replace(new RegExp(JUDO.plantillaTagsTodos.aniosActivo, 'g'), persona.data.aniosActivo)
        .replace(new RegExp(JUDO.plantillaTagsTodos.nTorneosDisputados, 'g'), persona.data.nTorneosDisputados)
        .replace(new RegExp(JUDO.plantillaTagsTodos.nTorneosGanados, 'g'), persona.data.nTorneosGanados)
        .replace(new RegExp(JUDO.plantillaTagsTodos.nLesiones, 'g'), persona.data.nLesiones)
}


/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

JUDO.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/JUDO/listarPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}
JUDO.recuperaTodos = async function (callBackFn, campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/JUDO/listarPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data, campo)
    }
}
JUDO.recuperaUna = async function (nombre, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/JUDO/listarUna/" + nombre
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

JUDO.personaTabla = function (persona){
    return JUDO.plantillaPersonas.cabeceraTodos
    + JUDO.plantillaPersonas.actualizaTodos(persona)
    + JUDO.plantillaPersonas.pie;
}

JUDO.imprimeUna = function (persona){
    if(persona!=null){
        let msj = JUDO.personaTabla(persona)
        Frontend.Article.actualizar("Muestra una persona", msj)
        JUDO.almacenaUna(persona)
    }
}
JUDO.almacenaUna = function (persona) {
    JUDO.personaMostrada = persona;
}
JUDO.mostrar = function (nombre){
    this.recuperaUna(nombre, this.imprimeUna)
}



/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
JUDO.procesarHome = function () {
    this.descargarRuta("/JUDO/", this.mostrarHome);
}

JUDO.procesarListarNombres = function (){
    JUDO.recupera(JUDO.imprimePersonas);
}

JUDO.procesarListarTodos = function (){
    JUDO.recupera(JUDO.imprimeTodasPersonas);
}

JUDO.procesarCampoOrdenado = function (campo){
    JUDO.recuperaTodos(JUDO.ordenaCampos, campo);
}

JUDO.procesarOrdenadoAlfabeticamente = function (nombre){
    JUDO.recuperaTodos(JUDO.ordenaNombre, nombre);
}



/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
JUDO.procesarAcercaDe = function () {
    this.descargarRuta("/JUDO/acercade", this.mostrarAcercaDe);
}