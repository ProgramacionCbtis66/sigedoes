const verifica = require('jsonwebtoken').verify;
const { ACCESS_TOKEN } = require('../../config.js');

function verificaToken(req, res, next) {
    const cabecera = req.headers.authorization;
    const token = cabecera && cabecera.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    verifica(token, ACCESS_TOKEN , { ignoreExpiration: true }, (error, usuario) => {
        if (error) return res.sendStatus(403);
        const horaActual = Date.now() / 1000;
        if (usuario.exp < horaActual) return res.sendStatus(401);
        next();
    });
}

module.exports = verificaToken;