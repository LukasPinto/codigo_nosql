const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialSchema = new Schema({
    observaciones: String,
    mascota: {type: Schema.Types.ObjectId, ref: 'mascotas'},
    fichas_consultas: [{type: Schema.Types.ObjectId, ref: 'ficha_consulta'}],
    enfermedades : [{type: Schema.Types.ObjectId, ref: 'enfermedad'}]
});

module.exports = mongoose.model('historial', historialSchema);