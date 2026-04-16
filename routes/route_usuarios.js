const usuarioController = require('../controllers/controller_usuario');

module.exports = (app) => {
    app.post('/api/usuarios', usuarioController.create);
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/usuarios/:id', usuarioController.find);
    app.put('/api/usuarios/:id', usuarioController.update);
    app.delete('/api/usuarios/:id', usuarioController.delete);
};
