const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialSchema = new Schema({
    observaciones: String,
    mascota: {type: Schema.Types.ObjectId, ref: 'Mascotas'},
    fichas_consultas: [{type: Schema.Types.ObjectId, ref: 'Fichas_consulta'}]
});

module.exports = mongoose.model('historial', historialSchema);