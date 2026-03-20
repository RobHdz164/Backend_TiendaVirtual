'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_producto extends Model {
    static associate(models) {
      this.belongsTo(models.tbc_categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria'
      });

      this.hasMany(models.tbd_carrito_detalle, {
        foreignKey: 'id_producto',
        as: 'detalles_carrito'
      });
    }
  }

  tbb_producto.init(
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbb_producto',
      tableName: 'tbb_productos'
    }
  );

  return tbb_producto;
};
