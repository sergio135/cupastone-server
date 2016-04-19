var express = require('express');
var router = express.Router();
var voto = require('../models/votos');

// Ruta de la home
router.get('/', function(req, res) {
    if (req.signedCookies.cupa_stone_questionary_login == 'cupastone') {
        voto.find(function (err, result) {
            if (err) return console.error(err);
            for (var rst of result) console.log(rst.nombre);
        })
        res.render('panel');
    } else {
        res.render('index', { msg: '' });
    }
});

// ruta para quitar la cookie y salir de la session
router.get('/salir', function(req, res) {
    res.clearCookie('cupa_stone_questionary_login');
    res.redirect('/');
});

//ruta para meter la cookie de session
router.post('/login', function(req, res) {
    if (req.body.user == 'cupastone' && req.body.pwd == 'cupam13') {
        res.cookie('cupa_stone_questionary_login', 'cupastone', { signed: true, httpOnly: true });
        res.redirect('/');
    } else {
    res.render('index', { msg: 'El usuario es incorrecto' });
    }
});

module.exports = router;
