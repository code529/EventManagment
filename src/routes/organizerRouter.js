const express = require('express');
const { isLoggedIn } = require('../controllers/authController');
const organizerControllers = require('../controllers/organizerController');

const router = express.Router();






// Right now not using isloggedIn because of cookies
router
    .route('/event')
    .get(organizerControllers.getEvents)
    .post(organizerControllers.createEvent);


module.exports  = router ; 