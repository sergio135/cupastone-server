var express = require('express');
var router = express.Router();
var voto = require('../models/votos');

// ruta principal de la API
router.get('/', function(req, res) {
    voto.find(function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(result);
    })
});


// ruta de creacion de la API
router.post('/create', function(req, res) {

    var crear = new voto ({
        agencia: req.body.agencia,
        opcion1: req.body.opcion1,
        opcion2: req.body.opcion2,
        lista: req.body.lista
    });

    if(crear.agencia && crear.opcion1) {
        crear.save(function(err, result) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(result);
        });
    } else {
        res.status(500).send('datos incompletos');
    }
});


module.exports = router;
