const express = require('express');
const router = express.Router();
const {
  getMessagesBetweenUsers,
  sendMessage
} = require('../controllers/messageController');

router.post('/', sendMessage); // POST /api/messages
router.get('/:from/:to', getMessagesBetweenUsers); // GET /api/messages/:from/:to

module.exports = router;


