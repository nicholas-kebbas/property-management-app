'use strict';
module.exports = (sequelize, DataTypes) => {
  const TenantPayment = sequelize.define('TenantPayment', {
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    property_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPaid:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  TenantPayment.associate = function(models) {
    TenantPayment.belongsTo(models.User, {
      foreignKey: 'tenantId',
      onDelete: 'CASCADE',
    })
  };
  return TenantPayment;
};
