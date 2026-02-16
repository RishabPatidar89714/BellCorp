const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Registration = sequelize.define('Registration', {
    registeredAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Registration;
};