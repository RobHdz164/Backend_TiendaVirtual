const Sequelize = require('sequelize');
const usuario = require('../models').tbc_usuario;

module.exports = {
    create(req, res){
        return usuario
        .create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol || 'cliente',
            fecha_registro: new Date(),
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return usuario.findAll()
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error));
    },
    find(req, res){
        const id = req.params.id;
        const email = req.params.email || req.query.email;

        if (id) {
            return usuario.findByPk(id)
            .then(usuarioItem => {
                if (!usuarioItem) {
                    return res.status(404).send({message: 'Usuario no encontrado'});
                }
                return res.status(200).send(usuarioItem);
            })
            .catch(error => res.status(400).send(error));
        }

        if (email) {
            return usuario.findAll({
                where: { email }
            })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id o email para buscar'});
    },
    update(req, res){
        const id = req.params.id;
        return usuario.findByPk(id)
        .then(usuarioItem => {
            if (!usuarioItem) {
                return res.status(404).send({message: 'Usuario no encontrado'});
            }
            return usuarioItem.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return usuario.findByPk(id)
        .then(usuarioItem => {
            if (!usuarioItem) {
                return res.status(404).send({message: 'Usuario no encontrado'});
            }
            return usuarioItem.destroy()
            .then(() => res.status(200).send({message: 'Usuario eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
