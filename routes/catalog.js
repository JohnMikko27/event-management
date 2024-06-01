const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const organizerController = require('../controllers/organizerController')
const participantController = require('../controllers/participantController')
const venueController = require('../controllers/venueController')

router.get('/', function(req, res, next) {
    res.render('index')
})

// Events
router.get('/events', eventController.getEventList)

router.get('/event/:id', eventController.getEventDetails)

router.get('/event/:id/delete', eventController.getDeleteEvent)

router.post('/event/:id/delete', eventController.postDeleteEvent)

router.get('/eventForm', eventController.getEventForm)

router.post('/eventForm', eventController.postEventForm)


// Organizers
router.get('/organizers', organizerController.getOrganizerList)

router.get('/organizer/:id', organizerController.getOrganizerDetails)

router.get('/organizer/:id/delete', organizerController.getDeleteOrganizer)

router.post('/organizer/:id/delete', organizerController.postDeleteOrganizer)

router.get('/organizerForm', organizerController.getOrganizerForm)

router.post('/organizerForm', organizerController.postOrganizerForm)


// Participants
router.get('/participants', participantController.getParticipantList)

router.get('/participant/:id', participantController.getParticipantDetails)

router.get('/participant/:id/delete', participantController.getDeleteParticipant)

router.post('/participant/:id/delete', participantController.postDeleteParticipant)

router.get('/participantForm', participantController.getParticipantForm)

router.post('/participantForm', participantController.postParticipantForm)

// Venues
router.get('/venues', venueController.getVenueList)

router.get('/venue/:id', venueController.getVenueDetails)

router.get('/venue/:id/delete', venueController.getDeleteVenue)

router.post('/venue/:id/delete', venueController.postDeleteVenue)

router.get('/venueForm', venueController.getVenueForm)

router.post('/venueForm', venueController.postVenueForm)


module.exports = router