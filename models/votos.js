var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votoSchema = new Schema({
    agencia: String,
    opcion1: String,
    opcion2: String,
    lista: String
});

var voto = mongoose.model('votos', votoSchema);

module.exports = voto;
