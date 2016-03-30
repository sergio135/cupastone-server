var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votoSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: String
});

var voto = mongoose.model('votos', votoSchema);

module.exports = voto;
