const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const organizerController = require('../controllers/organizerController')
const participantController = require('../controllers/participantController')
const venueController = require('../controllers/venueController')

router.get('/', function(req, res, next) {
    res.render('index')
})

router.get('/events', eventController.getEventList)

router.get('/organizers', organizerController.getOrganizerList)

router.get('/participants', participantController.getParticipantList)

router.get('/venues', venueController.getVenueList)

module.exports = router