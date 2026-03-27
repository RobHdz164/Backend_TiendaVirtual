const Sequelize = require('sequelize');
const carrito = require('../models').tbb_carrito;

module.exports = {
    create(req, res){
        return carrito
        .create({
            id_usuario: req.body.id_usuario,
            estado: req.body.estado !== undefined ? req.body.estado : true,
            fecha_creacion: new Date(),
            total: req.body.total || 0,
        })
        .then(carrito => res.status(200).send(carrito))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return carrito.findAll()
        .then(carritos => res.status(200).send(carritos))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const id = req.params.id;
        const id_usuario = req.params.id_usuario || req.query.id_usuario;

        if (id) {
            return carrito.findByPk(id)
            .then(carritoItem => {
                if (!carritoItem) {
                    return res.status(404).send({message: 'Carrito no encontrado'});
                }
                return res.status(200).send(carritoItem);
            })
            .catch(error => res.status(400).send(error));
        }

        if (id_usuario) {
            return carrito.findAll({
                where: { id_usuario }
            })
            .then(carritos => res.status(200).send(carritos))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id o id_usuario para buscar'});
    },
    update(req, res){
        const id = req.params.id;
        return carrito.findByPk(id)
        .then(carritoItem => {
            if (!carritoItem) {
                return res.status(404).send({message: 'Carrito no encontrado'});
            }
            return carritoItem.update({
                id_usuario: req.body.id_usuario,
                estado: req.body.estado,
                total: req.body.total,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return carrito.findByPk(id)
        .then(carritoItem => {
            if (!carritoItem) {
                return res.status(404).send({message: 'Carrito no encontrado'});
            }
            return carritoItem.destroy()
            .then(() => res.status(200).send({message: 'Carrito eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
