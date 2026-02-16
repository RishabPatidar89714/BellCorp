const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    name: { type: DataTypes.STRING, allowNull: false },
    organizer: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.TEXT },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING }
  });
  return Event;
};