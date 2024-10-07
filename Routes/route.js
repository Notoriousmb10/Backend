const express = require('express');
const { activateSimCard, deactivateSimCard, getSimDetails } = require('../Controllers/controller');

const router = express.Router();

router.post('/activate', activateSimCard);
router.post('/deactivate', deactivateSimCard);
router.get('/sim-details/:simNumber', getSimDetails);

module.exports = router;