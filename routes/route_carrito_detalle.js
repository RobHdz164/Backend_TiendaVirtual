const carritoDetalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
    app.post('/api/carrito-detalle', carritoDetalleController.create);
    app.get('/api/carrito-detalle', carritoDetalleController.list);
    app.get('/api/carrito-detalle/:id', carritoDetalleController.find);
    app.put('/api/carrito-detalle/:id', carritoDetalleController.update);
    app.delete('/api/carrito-detalle/:id', carritoDetalleController.delete);
};
