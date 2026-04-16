const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const producto = require('../models').tbb_producto;
const db = require('../models');

module.exports = {
    create(req, res){
        return producto
        .create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock || 0,
            id_categoria: req.body.id_categoria,
        })
        .then(productoCreado => res.status(200).send(productoCreado))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return producto.findAll({
            include: [{
                model: db.tbc_categoria,
                as: 'categoria'
            }]
        })
        .then(productos => res.status(200).send(productos))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const id = req.params.id;
        const nombre = req.query.nombre || req.query.name;
        const id_categoria = req.query.id_categoria;

        // Búsqueda por ID
        if (id && !isNaN(id)) {
            return producto.findByPk(id, {
                include: [{
                    model: db.tbc_categoria,
                    as: 'categoria'
                }]
            })
            .then(productoItem => {
                if (!productoItem) {
                    return res.status(404).send({message: 'Producto no encontrado'});
                }
                return res.status(200).send(productoItem);
            })
            .catch(error => res.status(400).send(error));
        }

        const where = {};
        if (nombre) {
            where.nombre = { [Op.like]: `%${nombre}%` };
        }
        if (id_categoria) {
            where.id_categoria = id_categoria;
        }

        if (nombre || id_categoria) {
            return producto.findAll({
                where,
                include: [{
                    model: db.tbc_categoria,
                    as: 'categoria'
                }]
            })
            .then(productos => res.status(200).send(productos))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id, nombre o id_categoria para buscar'});
    },
    update(req, res){
        const id = req.params.id;
        return producto.findByPk(id)
        .then(productoItem => {
            if (!productoItem) {
                return res.status(404).send({message: 'Producto no encontrado'});
            }
            return productoItem.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return producto.findByPk(id)
        .then(productoItem => {
            if (!productoItem) {
                return res.status(404).send({message: 'Producto no encontrado'});
            }
            return productoItem.destroy()
            .then(() => res.status(200).send({message: 'Producto eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
