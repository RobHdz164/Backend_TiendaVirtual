'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbb_carrito, {
        foreignKey: 'id_usuario',
        as: 'carritos'
      });
    }
  }
  tbc_usuario.init({
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    direccion: { type: DataTypes.STRING(200), allowNull: false },
    telefono: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
    rol: { type: DataTypes.ENUM('cliente', 'administrador'), allowNull: false, defaultValue: 'cliente' },
    fecha_registro: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    modelName: 'tbc_usuario',
    tableName: 'tbc_usuarios'
  });
  return tbc_usuario;
};