const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({

        nombre_mascota: String,
        especie: String,
        raza: String,
        edad: Number,
        peso: Number,
    cliente: [{type: Schema.Types.ObjectId, ref: 'cliente'}]
});

module.exports = mongoose.model('mascota', mascotaSchema);