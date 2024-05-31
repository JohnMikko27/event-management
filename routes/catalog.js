const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const organizerController = require('../controllers/organizerController')
const participantController = require('../controllers/participantController')
const venueController = require('../controllers/venueController')

router.get('/', function(req, res, next) {
    res.render('eventForm')
})

// Events
router.get('/events', eventController.getEventList)

router.get('/event/:id', eventController.getEventDetails)

router.get('/eventForm', eventController.getEventForm)

router.post('/eventForm', eventController.postEventForm)

// Organizers
router.get('/organizers', organizerController.getOrganizerList)

router.get('/organizer/:id', organizerController.getOrganizerDetails)

// Participants
router.get('/participants', participantController.getParticipantList)

router.get('/participant/:id', participantController.getParticipantDetails)

// Venues
router.get('/venues', venueController.getVenueList)

router.get('/venue/:id', venueController.getVenueDetails)

module.exports = router