const Message = require('../models/Message');

// POST /api/messages
const sendMessage = async (req, res) => {
  const { from, to, content } = req.body;

  if (!from || !to || !content) {
    return res.status(400).json({ error: 'from, to, and content are required' });
  }

  const newMessage = new Message({ from, to, content });
  await newMessage.save();

  res.status(201).json(newMessage);
};

// GET /api/messages/:from/:to
const getMessagesBetweenUsers = async (req, res) => {
  const { from, to } = req.params;

  const messages = await Message.find({
    $or: [
      { from, to },
      { from: to, to: from }
    ]
  }).sort({ timestamp: 1 });

  res.json(messages);
};

module.exports = { sendMessage, getMessagesBetweenUsers };
