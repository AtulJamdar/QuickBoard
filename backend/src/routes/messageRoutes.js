const express = require('express');
const router = express.Router();
const { createMessage, getMessagesByClass } = require('../controllers/messageController');

router.post('/', createMessage);
// GET /api/v1/messages/:classId
router.get('/:classId', getMessagesByClass);


module.exports = router;