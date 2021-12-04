const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Intializations
const app = express();

mongoose.connect('mongodb://localhost:27017/Veterinaria')
  .then(db => console.log("Conectado a MongoDB"))
  .catch(err => console.log(err));

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

//  Middlewares
app.use(express.json()); //Transfomar a formato JSON
app.use(bodyParser.urlencoded({extended: true})); // analiza el texto como datos codificados de URL y expone el objeto resultante (FORMULARIOS)

//  Rutas
app.use('/', require('./routes/prueba'));

//  Iniciando el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en puerto ',app.get('port'))
});
