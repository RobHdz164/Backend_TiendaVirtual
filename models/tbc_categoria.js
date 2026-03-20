'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_categoria extends Model {
    static associate(models) {
      this.hasMany(models.tbb_producto, {
        foreignKey: 'id_categoria',
        as: 'productos'
      });
    }
  }

  tbc_categoria.init(
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbc_categoria',
      tableName: 'tbc_categorias'
    }
  );

  return tbc_categoria;
};
