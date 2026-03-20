'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_carrito extends Model {
    static associate(models) {
      this.belongsTo(models.tbc_usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      this.hasMany(models.tbd_carrito_detalle, {
        foreignKey: 'id_carrito',
        as: 'detalles'
      });
    }
  }

  tbb_carrito.init(
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'tbb_carrito',
      tableName: 'tbb_carritos'
    }
  );

  return tbb_carrito;
};
