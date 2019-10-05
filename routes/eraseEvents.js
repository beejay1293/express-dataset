var express = require('express');
var eventController = require('../controllers/events');

var { eraseEvents } = eventController 
var router = express.Router();

// Route related to delete events
router.delete('/', eraseEvents)

module.exports = router;