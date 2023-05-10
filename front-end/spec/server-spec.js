/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js de aplicación Front-End
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */
const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor FRONT-END:', () => {
  describe('Cualquier ruta devuelve index.html', () => {
    it('Prueba ruta /', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.hasOwnProperty('text'));
          assert(res.text.search("<h1>Aplicación Microservicios Plantilla</h1>")>=0)

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Ruta /prueba/ruta/larga.txt', (done) => {
        supertest(app)
          .get('/prueba/ruta/larga.txt')
          .expect(200)
          .expect(function (res) {
            //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
            assert(res.hasOwnProperty('text'));
            assert(res.text.search("<h1>Aplicación Microservicios Plantilla</h1>")>=0)
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
  })
})
