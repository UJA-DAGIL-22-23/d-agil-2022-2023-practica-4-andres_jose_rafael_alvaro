/**
 * @file server.js
 * @description Define el servidor que aceptará las peticiones para la aplicación front-end.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const routes = require("./routes");
const app = express();
const port = 8000;
app.use("/", routes);

app.listen(port, () => {
  console.log(`Aplicación Front-End escuchando en puerto ${port}!`);
});

module.exports=app