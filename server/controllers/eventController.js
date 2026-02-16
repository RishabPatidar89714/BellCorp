const { Event } = require('../models');
exports.createEvent = async (req, res) => {
  try {
    const ev = await Event.create(req.body);
    res.status(201).json(ev);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};
exports.getEvents = async (req, res) => {
  try {
    const { search, category, location, page = 1, limit = 20 } = req.query;
    const where = {};

    if (search) where.name = { [require('sequelize').Op.like]: `%${search}%` };
    if (category) where.category = category;
    if (location) where.location = location;

    const offset = (Number(page) - 1) * Number(limit);

    const { rows: events, count: total } = await Event.findAndCountAll({
      where,
      order: [['date', 'ASC']],
      offset,
      limit: Number(limit)
    });

    res.json({ events, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getEventById = async (req, res) => {
  try {
    const ev = await Event.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};