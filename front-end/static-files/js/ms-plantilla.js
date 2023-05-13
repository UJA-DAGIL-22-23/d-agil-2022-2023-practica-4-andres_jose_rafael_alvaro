/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Microservicio MS Plantilla: acerca de",
    autor1: "Andrés", email1: "asb00028@red.ujaen.es", fecha1: "21-03-2023",
    autor2: "usuario2", email2: "usuario2@red.ujaen.es", fecha2: "21-03-2023",
    autor3: "usuario3", email3: "usuario3@red.ujaen.es", fecha3: "21-03-2023",
    autor4: "usuario4", email4: "usuario4@red.ujaen.es", fecha4: "21-03-2023"
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor1 === "undefined" ||
        typeof datosDescargados.email1 === "undefined" ||
        typeof datosDescargados.fecha1 === "undefined"
    ) datosDescargados = this.datosDescargadosNulos
    
    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor 1</b>: ${datosDescargados.autor1}</li>
        <li><b>E-mail 1</b>: ${datosDescargados.email1}</li>
        <li><b>Fecha 1</b>: ${datosDescargados.fecha1}</li>
        </br>
        <li><b>Autor 2</b>: ${datosDescargados.autor2}</li>
        <li><b>E-mail 2</b>: ${datosDescargados.email2}</li>
        <li><b>Fecha 2</b>: ${datosDescargados.fecha2}</li>
        </br>
        <li><b>Autor 3</b>: ${datosDescargados.autor3}</li>
        <li><b>E-mail 3</b>: ${datosDescargados.email3}</li>
        <li><b>Fecha 3</b>: ${datosDescargados.fecha3}</li>
        </br>
        <li><b>Autor 4</b>: ${datosDescargados.autor3}</li>
        <li><b>E-mail 4</b>: ${datosDescargados.email3}</li>
        <li><b>Fecha 4</b>: ${datosDescargados.fecha3}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}



