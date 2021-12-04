const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    primernombre:{type: String,required: true},
    primerapellido:String,
    rut:Number,
    correo:String,
    clave:String,
    mascota: [{type: Schema.Types.ObjectId, ref: 'mascotas',required: true}],
    
    
});

module.exports = mongoose.model('Cliente', clienteSchema);