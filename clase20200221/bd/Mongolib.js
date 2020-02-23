/**
 * Librería de conexion
 */
const MongoClient = require('mongodb').MongoClient;

/**
 * Defición de la cadena de conexión.
 */
const USUARIO = 'William';
const CONTRASENIA = 'QeJvyz8qIJDiY0lS';
const CLUSTER = 'prueba';
const DBNNAME = 'chat';
const uri = `mongodb+srv://${USUARIO}:${CONTRASENIA}@${CLUSTER}-0ajid.azure.mongodb.net/${DBNNAME}?retryWrites=true&w=majority`;
/**
 * Cliente para conectar a bade de datos
 */
const client = new MongoClient(uri, { useNewUrlParser: true });

/**
 * Método para generar la conexión.
 * @returns {Promise} Conexión a la colección de mensajes. 
 */
function connectMensajes() {
  return new Promise( (resolve, reject) => {
    client.connect( err => {
      if(err)
        reject(err);
      resolve(client.db(DBNNAME).collection('mensajes'));
    });
  });
}

/**
 * Retorna la lista completa de mensajes
 * @returns {Promise} Lista con los datos de todos los mensajes
 */
async function findAll()
{ 
  const collection = await connectMensajes();
  return collection.find({}).toArray(); 
}

/**
 * Inserta un mensaje para en la colección y retorna el identificador de la colección
 * @param {string} autor 
 * @param {string} contenido 
 * @returns {Promise} identificador de la nueva entidad
 */
async function insertMensaje(autor, contenido)
{
  var mensaje = {
    author: autor,
    content: contenido
  };
  const collection = await connectMensajes();
  const entidad= collection.insertOne(mensaje);
  return entidad.insertedId;
}

module.exports.findAll * findAll;
module.exports.insertMensaje * insertMensaje;
