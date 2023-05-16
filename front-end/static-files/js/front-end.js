/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};

/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"

/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}




// Codigo nuevo añadido

/// Nombre de los campos del formulario para editar una persona
Frontend.form = {
    NOMBRE: "frontend-nombre",
    APELLIDOS: "frontend-apellidos",
    SEXO: "frontend-sexo",
    NACIMIENTO: "frontend-nacimiento",
    AÑO_INICIO: "frontend-añoinicio",
    DIRECCION: "frontend-direccion",
    CLASE_DEPORTIVA: "frontend-clasedeportiva",
    AÑOS_JUGADOS: "frontend-añosjugados",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Frontend.personaMostrada = null

// Tags que voy a usar para sustituir los campos
Frontend.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "SEXO": "### SEXO ###",
    "NACIMIENTO": "### NACIMIENTO ###",
    "AÑO_INICIO": "### AÑO_INICIO ###",
    "DIRECCION": "### DIRECCION ###",
    "CLASE_DEPORTIVA": "### CLASE_DEPORTIVA ###",
    "AÑOS_JUGADOS": "### AÑOS_JUGADOS ###",
}
/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Frontend.plantillaFormularioPersona = {}

Frontend.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
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
                    <div><a href="javascript:Personas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Personas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Personas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;


/// Plantilla para poner los datos de varias personas dentro de una tabla
Frontend.plantillaTablaPersonas = {}

// Cabecera de la tabla
Frontend.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">eMail</th>
                        <th width="15%">Año contratación</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Frontend.plantillaTablaPersonas.cuerpo = `
    <tr title="${Frontend.plantillaTags.ID}">
        <td>${Frontend.plantillaTags.NOMBRE}</td>
        <td>${Frontend.plantillaTags.APELLIDOS}</td>
        <td>${Frontend.plantillaTags.SEXO}</td>
        <td>${Frontend.plantillaTags["NACIMIENTO"]}</td>
        <td>${Frontend.plantillaTags.AÑO_INICIO}</td>
        <td>${Frontend.plantillaTags["DIRECCION"]}</td>
        <td>${Frontend.plantillaTags.CLASE_DEPORTIVA}</td>
        <td>${Frontend.plantillaTags["AÑOS_JUGADOS"]}</td>
        <td>
                    <div><a href="javascript:Personas.mostrar('${Frontend.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Frontend.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;

             /**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Personas.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Personas.plantillaTags.NOMBRE, 'g'), persona.ref['@ref'].nombre)
        .replace(new RegExp(Personas.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Personas.plantillaTags.SEXO, 'g'), persona.data.sexo)
        .replace(new RegExp(Personas.plantillaTags["NACIMIENTO"], 'g'), persona.data.nacimiento)
        .replace(new RegExp(Personas.plantillaTags.AÑO_INICIO, 'g'), persona.data.año_inicio)
        .replace(new RegExp(Personas.plantillaTags["DIRECCION"], 'g'), persona.data.direccion)
        .replace(new RegExp(Personas.plantillaTags.CLASE_DEPORTIVA, 'g'), persona.data.clase_deportiva)
        .replace(new RegExp(Personas.plantillaTags["AÑOS_JUGADOS"], 'g'), persona.data.años_jugados)
}


/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Personas.plantillaFormularioPersona.actualiza = function (persona) {
    return Personas.sustituyeTags(this.formulario, persona)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Personas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/personas/getTodas"
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

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Personas.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/personas/getPorId/" + idPersona
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

// Final codigo nuevo añadido