const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fichaSchema = new Schema({
    fecha: Date,
    diagnostico: String,
    veterinario: String,
    id_historial: {type: Schema.Types.ObjectId, ref: 'historial'}
});

module.exports = mongoose.model('ficha_consulta', fichaSchema);