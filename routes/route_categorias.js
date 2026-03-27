const categoriaController = require('../controllers/controller_categoria');

module.exports = (app) => {
    app.post('/api/categorias', categoriaController.create);
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categorias/:id', categoriaController.find);
    app.put('/api/categorias/:id', categoriaController.update);
    app.delete('/api/categorias/:id', categoriaController.delete);
};