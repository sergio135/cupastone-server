var express = require('express');
var router = express.Router();
var voto = require('../models/votos');

// ruta principal de la API
router.get('/', function(req, res) {
    if (req.query.fecha1 && req.query.fecha2) {
        voto.find({ fecha: { $gte: req.query.fecha1, $lte: req.query.fecha2 } }, function (err, result) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(result);
            console.log('2 parametros')
        });
    } else if (req.query.fecha) {
        voto.find({fecha: req.query.fecha }, function (err, result) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(result);
            console.log('1 parametros')
        });
    } else {
        voto.find(function (err, result) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(result);
            console.log('sin parametros')
        });
    }
});


// ruta de creacion de la API
router.post('/create', function(req, res) {
    var crear = new voto ({
        agencia: req.body.agencia,
        opcion1: req.body.opcion1,
        opcion2: req.body.opcion2,
        lista: req.body.lista
    });

    if(crear.agencia && crear.opcion1 && crear.opcion2 && crear.lista) {
        crear.save(function(err, result) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(result);
        });
    } else {
        res.status(500).send('datos incompletos');
    }
});


module.exports = router;
