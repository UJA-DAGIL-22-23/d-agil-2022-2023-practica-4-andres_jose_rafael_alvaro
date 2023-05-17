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
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
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
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor 1</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail 1</b>: ${datosDescargados.email}</li>
        <li><b>Fecha 1</b>: ${datosDescargados.fecha}</li>
        <br/>
        <li><b>Autor 2</b>: ${datosDescargados.autor2}</li>
        <li><b>E-mail 2</b>: ${datosDescargados.email2}</li>
        <li><b>Fecha 2</b>: ${datosDescargados.fecha2}</li>
        <br/>
        <li><b>Autor 3</b>: ${datosDescargados.autor3}</li>
        <li><b>E-mail 3</b>: ${datosDescargados.email3}</li>
        <li><b>Fecha 3</b>: ${datosDescargados.fecha3}</li>
        <br/>
        <li><b>Autor 4</b>: ${datosDescargados.autor4}</li>
        <li><b>E-mail 4</b>: ${datosDescargados.email4}</li>
        <li><b>Fecha 4</b>: ${datosDescargados.fecha4}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}



// Codigo nuevo

Plantilla.mostrarDeportistas = function (datosDescargados) {
    const mensajeAMostrar = `<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">eMail</th>
            <th width="15%">Año contratación</th><th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="1234_ID_1234">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="1234_ID_1234}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Frontend.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Frontend.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-email" required value="${Frontend.plantillaTags.SEXO}" 
                        name="email_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" min="1950" max="2030" size="8" required
                        value="${Frontend.plantillaTags["NACIMIENTO"]}" 
                        name="año_entrada_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Frontend.plantillaTags.AÑO_INICIO}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" min="1950" max="2030" size="8" required
                        value="${Frontend.plantillaTags["DIRECCION"]}" 
                        name="año_entrada_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-email" required value="${Frontend.plantillaTags.CLASE_DEPORTIVA}" 
                        name="email_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" min="1950" max="2030" size="8" required
                        value="${Frontend.plantillaTags["AÑOS_JUGADOS"]}" 
                        name="año_entrada_persona"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
    Frontend.Article.actualizar("Plantilla Deportistas", mensajeAMostrar)
}

// Final Codigo nuevo



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





