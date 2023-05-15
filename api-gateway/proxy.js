/**
 * @file proxy.js
 * @description Creación de un objeto de tipo PROXY que reescribe las llamadas servidor/proyectos, servidor/personas, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, routes) => {
    // Va tomando una por una las rutas definidas en proxy-routes.js y las va incluyendo en el servidor (es decir, app)
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

exports.setupProxies = setupProxies
