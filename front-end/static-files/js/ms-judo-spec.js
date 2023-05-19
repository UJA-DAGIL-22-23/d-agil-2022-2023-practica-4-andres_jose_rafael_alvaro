/**
 * @file ms-judo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Judo en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloJudo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoJudo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_JUDO = "Judo Home"
const TITULO_ACERCA_DE_JUDO = "Judo Acerca de"
const LISTADO_NOMBRES_ORDENADOS = "Listado de personas solo con su nombre"
const LISTADO_NOMBRE= "Listado de personas"
const LISTADO_NOMBRE_TODAS = "Listado de  todas las personas"
const LISTADO_UNA= "Muestra una persona"


const datosDescargadosPruebaJudo = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Judo.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            JUDO.mostrarHome()
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_HOME_JUDO)
            expect(elementoContenidoJudo.innerHTML).toBe(JUDO.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            JUDO.mostrarHome(23)
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_HOME_JUDO)
            expect(elementoContenidoJudo.innerHTML).toBe(JUDO.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            JUDO.mostrarHome({})
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_HOME_JUDO)
            expect(elementoContenidoJudo.innerHTML).toBe(JUDO.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            JUDO.mostrarHome({ foo: "bar" })
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_HOME_JUDO)
            expect(elementoContenidoJudo.innerHTML).toBe(JUDO.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            JUDO.mostrarHome(datosDescargadosPruebaJudo)
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_HOME_JUDO)
            expect(elementoContenidoJudo.innerHTML).toBe(datosDescargadosPruebaJudo.mensaje)
        })
})


describe("Judo.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            JUDO.mostrarAcercaDe()
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            JUDO.mostrarAcercaDe(23)
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            JUDO.mostrarAcercaDe({})
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            JUDO.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            JUDO.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            JUDO.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            JUDO.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)
            expect(elementoContenidoJudo.innerHTML.search(JUDO.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            JUDO.mostrarAcercaDe(datosDescargadosPruebaJudo)
            expect(elementoTituloJudo.innerHTML).toBe(TITULO_ACERCA_DE_JUDO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoJudo.innerHTML.search(datosDescargadosPruebaJudo.autor) >= 0).toBeTrue()
            expect(elementoContenidoJudo.innerHTML.search(datosDescargadosPruebaJudo.email) >= 0).toBeTrue()
            expect(elementoContenidoJudo.innerHTML.search(datosDescargadosPruebaJudo.fecha) >= 0).toBeTrue()
        })
})

describe ("Judo.ordenaCampos", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        JUDO.ordenaCampos([])
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })

    /** 
    it("Si le pasamos datos nulos, devuelve datos nulos",
    function(){
        Judo.ordenaCampos(10)
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })
    */
})
describe ("Judo.ordenaNombre", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        JUDO.ordenaNombre([])
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })

    /** 
    it("Si le pasamos datos nulos, devuelve datos nulos",
    function(){
        Judo.ordenaCampos(10)
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })
    */
})
describe ("Judo.imprimeTodasPersonas", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        JUDO.imprimeTodasPersonas([])
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRE_TODAS)
    })
})
describe ("Judo.imprimePersonas", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        JUDO.imprimePersonas([])
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_NOMBRE)
    })
})
/** 
describe ("Judo.imprimeUna", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        Judo.imprimeUna(null)
        expect(elementoTituloJudo.innerHTML).toBe(LISTADO_UNA)
    })
})
*/





/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Judo.descargarRuta
 - Judo.procesarAcercaDe
 - Judo.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */