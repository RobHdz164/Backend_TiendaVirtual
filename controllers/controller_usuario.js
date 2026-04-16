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
        const nombre = req.query.nombre || req.query.name;
        const email = req.query.email;
        const { Op } = require('sequelize');

        // Búsqueda por ID
        if (id && !isNaN(id)) {
            return usuario.findByPk(id)
            .then(usuarioItem => {
                if (!usuarioItem) {
                    return res.status(404).send({message: 'Usuario no encontrado'});
                }
                return res.status(200).send(usuarioItem);
            })
            .catch(error => res.status(400).send(error));
        }

        const where = {};
        if (nombre) {
            where.nombre = { [Op.like]: `%${nombre}%` };
        }
        if (email) {
            where.email = { [Op.like]: `%${email}%` };
        }

        if (nombre || email) {
            return usuario.findAll({ where })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));
        }

        return res.status(400).send({message: 'Debe proporcionar id, nombre o email para buscar'});
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
    login(req, res){
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email y contraseña son requeridos' });
        }

        return usuario.findOne({ where: { email } })
            .then(usuarioItem => {
                if (!usuarioItem) {
                    return res.status(401).send({ message: 'Credenciales inválidas' });
                }

                // Comparar contraseñas
                if (usuarioItem.password !== password) {
                    return res.status(401).send({ message: 'Credenciales inválidas' });
                }

                // Generar JWT
                const jwt = require('jsonwebtoken');
                const token = jwt.sign(
                    { id: usuarioItem.id, email: usuarioItem.email, rol: usuarioItem.rol },
                    process.env.JWT_SECRET || 'tu_clave_secreta_aqui',
                    { expiresIn: '24h' }
                );

                return res.status(200).send({ token });
            })
            .catch(error => res.status(500).send(error));
    },
};
