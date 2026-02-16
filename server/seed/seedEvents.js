require('dotenv').config();
const { sequelize, Event } = require('../models');

const sampleEvents = [
  {
    name: 'Tech Summit 2026',
    organizer: 'Bellcorp',
    location: 'Indore',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: 'A summit for tech enthusiasts.',
    capacity: 200,
    category: 'Technology'
  },
  {
    name: 'Startup Pitch Night',
    organizer: 'Bellcorp Ventures',
    location: 'Mumbai',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    description: 'Pitch your startup to investors.',
    capacity: 100,
    category: 'Business'
  },
  {
    name: 'Music Fest',
    organizer: 'Bellcorp Entertainment',
    location: 'Delhi',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    description: 'Live performances by top artists.',
    capacity: 500,
    category: 'Music'
  },
  {
    name: 'Art Expo',
    organizer: 'Bellcorp Arts',
    location: 'Pune',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    description: 'Exhibition of modern art.',
    capacity: 150,
    category: 'Art'
  }
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Event.bulkCreate(sampleEvents);
    console.log('Seeded events successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();