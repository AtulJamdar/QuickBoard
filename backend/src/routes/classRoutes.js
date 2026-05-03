const express = require('express');
const router = express.Router();
const { createClass, getClassByCode } = require('../controllers/classController');


//POST /api/classes
router.post('/', createClass);
//GET /api/v1/classes/:id
router.get('/:id', getClassByCode);

module.exports = router;