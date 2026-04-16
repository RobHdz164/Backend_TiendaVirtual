const Sequelize = require('sequelize');
const carrito_detalle = require('../models').tbd_carrito_detalle;
const db = require('../models');

module.exports = {
    create(req, res){
        return carrito_detalle
        .create({
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad || 1,
        })
        .then(detalleCreado => res.status(200).send(detalleCreado))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return carrito_detalle.findAll({
            include: [
                { model: db.tbb_carrito, as: 'carrito' },
                { model: db.tbb_producto, as: 'producto' }
            ]
        })
        .then(detalles => res.status(200).send(detalles))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const { Op } = require('sequelize');
        const id = req.params.id;
        const id_carrito = req.query.id_carrito;
        const id_producto = req.query.id_producto;
        const nombre_producto = req.query.nombre_producto || req.query.nombre;

        // Búsqueda por ID de detalle
        if (id && !isNaN(id)) {
            return carrito_detalle.findByPk(id, {
                include: [
                    { model: db.tbb_carrito, as: 'carrito' },
                    { model: db.tbb_producto, as: 'producto' }
                ]
            })
            .then(detalleItem => {
                if (!detalleItem) {
                    return res.status(404).send({message: 'Detalle de carrito no encontrado'});
                }
                return res.status(200).send(detalleItem);
            })
            .catch(error => res.status(400).send(error));
        }

        const where = {};
        if (id_carrito && !isNaN(id_carrito)) {
            where.id_carrito = id_carrito;
        }
        if (id_producto && !isNaN(id_producto)) {
            where.id_producto = id_producto;
        }

        if (Object.keys(where).length > 0 || nombre_producto) {
            const include = [
                { model: db.tbb_carrito, as: 'carrito' },
                { model: db.tbb_producto, as: 'producto' }
            ];

            if (nombre_producto) {
                include[1].where = { nombre: { [Op.like]: `%${nombre_producto}%` } };
            }

            return carrito_detalle.findAll({
                where,
                include
            })
            .then(detalles => res.status(200).send(detalles))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id, id_carrito, id_producto o nombre_producto para buscar'});
    },
    update(req, res){
        const id = req.params.id;
        return carrito_detalle.findByPk(id)
        .then(detalleItem => {
            if (!detalleItem) {
                return res.status(404).send({message: 'Detalle de carrito no encontrado'});
            }
            return detalleItem.update({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return carrito_detalle.findByPk(id)
        .then(detalleItem => {
            if (!detalleItem) {
                return res.status(404).send({message: 'Detalle de carrito no encontrado'});
            }
            return detalleItem.destroy()
            .then(() => res.status(200).send({message: 'Detalle de carrito eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
