const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const EventModel = require('./Event');
const RegistrationModel = require('./Registration');

const sequelize = new Sequelize(
  'bellcorp',   
  'root',         
  'manager',      
  {
    host: 'localhost',  
    dialect: 'mysql',
    logging: false
  }
);

const User = UserModel(sequelize);
const Event = EventModel(sequelize);
const Registration = RegistrationModel(sequelize);
User.hasMany(Registration, { foreignKey: 'userId' });
Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(User, { foreignKey: 'userId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = { sequelize, User, Event, Registration };