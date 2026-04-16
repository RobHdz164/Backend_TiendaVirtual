const productoController = require('../controllers/controller_producto');

module.exports = (app) => {
    app.post('/api/productos', productoController.create);
    app.get('/api/productos', productoController.list);
    app.get('/api/productos/:id', productoController.find);
    app.put('/api/productos/:id', productoController.update);
    app.delete('/api/productos/:id', productoController.delete);
};
