var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votoSchema = new Schema({
    agencia: String,
    opcion1: String,
    opcion2: String,
    lista: String,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('votos', votoSchema);
