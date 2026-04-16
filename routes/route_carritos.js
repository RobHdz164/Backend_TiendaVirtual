const carritoController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.post('/api/carritos', carritoController.create);
    app.get('/api/carritos', carritoController.list);
    app.get('/api/carritos/:id', carritoController.find);
    app.put('/api/carritos/:id', carritoController.update);
    app.delete('/api/carritos/:id', carritoController.delete);
};
