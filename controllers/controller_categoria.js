const Sequelize = require('sequelize');
const db = require('../models');
const categoria = db.tbc_categoria;

module.exports = {
    create(req, res){
        return categoria
        .create({
            nombre: req.body.nombre,
        })
        .then(categoria => res.status(200).send({message: 'Categoria creada', categoria}))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return categoria.findAll()
        .then(categorias => res.status(200).send({message: 'Categorias encontradas', categorias}))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const { Op } = require('sequelize');
        const id = req.params.id;
        const nombre = req.query.nombre || req.query.name;

        // Búsqueda por ID
        if (id && !isNaN(id)) {
            return categoria.findByPk(id)
            .then(categoriaItem => {
                if (!categoriaItem) {
                    return res.status(404).send({message: 'Categoria no encontrada'});
                }
                return res.status(200).send(categoriaItem);
            })
            .catch(error => res.status(400).send(error));
        }

        // Búsqueda por nombre
        if (nombre) {
            return categoria.findAll({
                where: { nombre: { [Op.like]: `%${nombre}%` } }
            })
            .then(categorias => res.status(200).send(categorias))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id o nombre para buscar'});
    },
    update(req, res){
        const id = req.params.id;
        return categoria.findByPk(id)
        .then(categoriaItem => {
            if (!categoriaItem) {
                return res.status(404).send({message: 'Categoria no encontrada'});
            }
            return categoriaItem.update({
                nombre: req.body.nombre,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return categoria.findByPk(id)
        .then(categoriaItem => {
            if (!categoriaItem) {
                return res.status(404).send({message: 'Categoria no encontrada'});
            }
            return categoriaItem.destroy()
            .then(() => res.status(200).send({message: 'Categoria eliminada'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
