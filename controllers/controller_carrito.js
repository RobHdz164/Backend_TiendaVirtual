const Sequelize = require('sequelize');
const carrito = require('../models').tbb_carrito;
const db = require('../models');

module.exports = {
    create(req, res){
        return carrito
        .create({
            id_usuario: req.body.id_usuario,
            estado: req.body.estado !== undefined ? req.body.estado : true,
            fecha_creacion: new Date(),
            total: req.body.total || 0,
        })
        .then(carritoCreado => res.status(200).send(carritoCreado))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return carrito.findAll({
            include: [
                { model: db.tbc_usuario, as: 'usuario' },
                { model: db.tbd_carrito_detalle, as: 'detalles' }
            ]
        })
        .then(carritos => res.status(200).send(carritos))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const { Op } = require('sequelize');
        const id = req.params.id;
        const id_usuario = req.query.id_usuario;
        const nombre_usuario = req.query.nombre_usuario || req.query.nombre;

        // Búsqueda por ID de carrito
        if (id && !isNaN(id)) {
            return carrito.findByPk(id, {
                include: [
                    { model: db.tbc_usuario, as: 'usuario' },
                    { model: db.tbd_carrito_detalle, as: 'detalles' }
                ]
            })
            .then(carritoItem => {
                if (!carritoItem) {
                    return res.status(404).send({message: 'Carrito no encontrado'});
                }
                return res.status(200).send(carritoItem);
            })
            .catch(error => res.status(400).send(error));
        }

        // Búsqueda por ID de usuario
        if (id_usuario && !isNaN(id_usuario)) {
            return carrito.findAll({
                where: { id_usuario },
                include: [
                    { model: db.tbc_usuario, as: 'usuario' },
                    { model: db.tbd_carrito_detalle, as: 'detalles' }
                ]
            })
            .then(carritos => res.status(200).send(carritos))
            .catch(error => res.status(400).send(error));
        }

        // Búsqueda por nombre de usuario
        if (nombre_usuario) {
            return carrito.findAll({
                include: [
                    {
                        model: db.tbc_usuario,
                        as: 'usuario',
                        where: { nombre: { [Op.like]: `%${nombre_usuario}%` } }
                    },
                    { model: db.tbd_carrito_detalle, as: 'detalles' }
                ]
            })
            .then(carritos => res.status(200).send(carritos))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id, id_usuario o nombre_usuario para buscar'});
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
