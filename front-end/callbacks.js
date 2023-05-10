/**
 * @file callbacks.js - 
 * @description Callbacks para la aplicación front-end.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición al servidor que ejecuta el front-end.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const SEND_FILE_OPTIONS = { root: (__dirname + '/static-files') }


// Permitir CORS
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}
// CALLBACKS ADICIONALES
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            res.sendFile("/index.html",
                SEND_FILE_OPTIONS,
                function (err) {
                    if (err) {
                        console.error(err);
                    }
                })
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    }
}


// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = {  ...CB_OTHERS }
