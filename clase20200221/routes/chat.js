var express = require('express');
var router = express.Router();
var clienteBD = require('../bd/Mongolib');

/* GET chat listing. */
router.get('/', function(req, res, next) { 
    clienteBD.findAll().then( mensajes => {
        res.send(mensajes);
    });
});

/* GET chat listing. */
router.post('/', function(req, res, next) { 
    clienteBD.insertMensaje(req.body.autor, req.body.content);
    res.send(req.body);
});

module.exports = router;