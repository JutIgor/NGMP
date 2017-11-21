'use strict';
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
    name: DataTypes.STRING,
    reviews: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return products;
};