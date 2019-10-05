var express = require('express');
var router = express.Router();
var eventController = require('../controllers/events');

// Routes related to event
var router = express.Router();
var { addEvent, getAllEvents, getByActor } = eventController 

// Routes related to event
router.post('/', addEvent)
router.get('/', getAllEvents)
router.get('/actors/:actorId', getByActor);


module.exports = router;