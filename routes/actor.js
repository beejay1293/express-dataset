var express = require('express');
var actorsController = require('../controllers/actors');

const { getAllActors, updateActor, getStreak } = actorsController

var router = express.Router();

router.get('/', getAllActors);
router.get('/streak', getStreak);
router.put('/', updateActor);

module.exports = router;