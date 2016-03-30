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
router.get('/create', function(req, res) {
    console.log(req.body);

    var crear = new voto ({
        agencia: req.agencia,
        opcion1: req.opcion1,
        opcion2: req.opcion2,
        lista: req.lista,
    });

    crear.save(function(err, result) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(result);
    });
    res.send('crear datos');
});

module.exports = router;
