const { Registration, Event } = require('../models');
exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;
    if (!eventId) return res.status(400).json({ message: 'eventId required' });

    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const count = await Registration.count({ where: { eventId } });
    if (count >= event.capacity) {
      return res.status(400).json({ message: 'Event capacity reached' });
    }
    const existing = await Registration.findOne({ where: { userId, eventId } });
    if (existing) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const reg = await Registration.create({ userId, eventId });
    res.status(201).json(reg);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.cancelRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const { registrationId } = req.params;

    const reg = await Registration.findOne({ where: { id: registrationId, userId } });
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    await reg.destroy();
    res.json({ message: 'Cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;
    const regs = await Registration.findAll({
      where: { userId },
      include: [{ model: Event }],
      order: [['registeredAt', 'DESC']]
    });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};