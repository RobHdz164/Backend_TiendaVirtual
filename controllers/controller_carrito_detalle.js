const Sequelize = require('sequelize');
const carrito_detalle = require('../models').tbd_carrito_detalle;

module.exports = {
    create(req, res){
        return carrito_detalle
        .create({
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad || 1,
        })
        .then(carrito_detalle => res.status(200).send(carrito_detalle))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return carrito_detalle.findAll()
        .then(detalles => res.status(200).send(detalles))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const id = req.params.id;
        const id_carrito = req.params.id_carrito || req.query.id_carrito;

        if (id) {
            return carrito_detalle.findByPk(id)
            .then(detalleItem => {
                if (!detalleItem) {
                    return res.status(404).send({message: 'Detalle de carrito no encontrado'});
                }
                return res.status(200).send(detalleItem);
            })
            .catch(error => res.status(400).send(error));
        }

        if (id_carrito) {
            return carrito_detalle.findAll({
                where: { id_carrito }
            })
            .then(detalles => res.status(200).send(detalles))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id o id_carrito para buscar'});
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
