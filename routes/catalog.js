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

router.get('/event/:id/update', eventController.getEventUpdateForm)

router.post('/event/:id/update', eventController.postEventUpdateForm)

// Organizers
router.get('/organizers', organizerController.getOrganizerList)

router.get('/organizer/:id', organizerController.getOrganizerDetails)

router.get('/organizer/:id/delete', organizerController.getDeleteOrganizer)

router.post('/organizer/:id/delete', organizerController.postDeleteOrganizer)

router.get('/organizerForm', organizerController.getOrganizerForm)

router.post('/organizerForm', organizerController.postOrganizerForm)

router.get('/organizer/:id/update', organizerController.getOrganizerUpdateForm)

router.post('/organizer/:id/update', organizerController.postOrganizerUpdateForm)


// Participants
router.get('/participants', participantController.getParticipantList)

router.get('/participant/:id', participantController.getParticipantDetails)

router.get('/participant/:id/delete', participantController.getDeleteParticipant)

router.post('/participant/:id/delete', participantController.postDeleteParticipant)

router.get('/participantForm', participantController.getParticipantForm)

router.post('/participantForm', participantController.postParticipantForm)

router.get('/participant/:id/update', participantController.getParticipantUpdateForm)

router.post('/participant/:id/update', participantController.postParticipantUpdateForm)


// Venues
router.get('/venues', venueController.getVenueList)

router.get('/venue/:id', venueController.getVenueDetails)

router.get('/venue/:id/delete', venueController.getDeleteVenue)

router.post('/venue/:id/delete', venueController.postDeleteVenue)

router.get('/venueForm', venueController.getVenueForm)

router.post('/venueForm', venueController.postVenueForm)

router.get('/venue/:id/update', venueController.getVenueUpdateForm)

router.post('/venue/:id/update', venueController.postVenueUpdateForm)


module.exports = router