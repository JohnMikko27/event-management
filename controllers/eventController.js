// display list of events
// display detail page for an event
// display event form
// handle post request on event form
// handle delete request 
// display form for updating
// handle update request

const Event = require('../models/event')
const Organizer = require('../models/organizer')
const Participant = require('../models/participant')
const Venue = require('../models/venue')

const asyncHandler = require('express-async-handler')

exports.getEventList = asyncHandler(async(req, res, next) => {
    const allEvents = await Event.find().sort({ title: 1 }).exec();

    res.render("eventList", {
        title: "Event List",
        eventList: allEvents,
    });
})

exports.getEventDetails = asyncHandler(async(req, res, next) => {
    const eventDetails = await Event
        .findById(req.params.id)
        .populate('venue')
        .populate('organizer')
        .populate('participants')
        .exec()
    
    // No results.
    if (eventDetails === null) {
        const err = new Error("Event not found");
        err.status = 404;
        return next(err);
    }
    res.render('eventDetails', {
        title: 'Event Details',
        eventDetails: eventDetails
    })
})

exports.getEventForm = asyncHandler(async(req, res, next) => {
    const allOrganizers = await Organizer.find().sort({name: 1}).exec()
    const allParticipants = await Participant.find().sort({name: 1}).exec()
    const allVenues = await Venue.find().sort({name: 1}).exec()
    
    res.render('eventForm', {
        title: 'Create Event Form',
        organizers: allOrganizers,
        participants: allParticipants,
        venues: allVenues
    })
})

exports.postEventForm = asyncHandler(async(req, res, next) => {
    const venueObj = await Venue.findOne({ name: req.body.eventVenue }).exec()
    const organizerObj = await Organizer.findOne({ name: req.body.eventOrganizer }).exec()
    const participantArr = []
    if (!Array.isArray(req.body.eventParticipants)) {
        const p = await Participant.findOne({ name:req.body.eventParticipants }).exec()
        participantArr.push(p)
    } else {
        for (let i = 0; i < req.body.eventParticipants.length; i++) {
            const p = await Participant.findOne({ name: req.body.eventParticipants[i] }).exec()
            participantArr.push(p)
        }
    }

    const event = new Event({
        title: req.body.eventTitle,
        description: req.body.eventDescription,
        date: req.body.eventDate,
        time: req.body.eventTime,
        venue: venueObj,
        organizer: organizerObj,
        participants: participantArr
    })
    
    await event.save()
    res.redirect(event.url)
})

exports.getDeleteEvent = asyncHandler(async(req, res, next) => {
    res.render('deleteForm', {
        title: 'Delete event'
    })
})

exports.postDeleteEvent = asyncHandler(async(req, res, next) => {
    await Event.findByIdAndDelete(req.params.id)
    res.redirect('/events')
})


exports.getEventUpdateForm = asyncHandler(async(req, res, next) => {
    const allOrganizers = await Organizer.find().sort({name: 1}).exec()
    const allParticipants = await Participant.find().sort({name: 1}).exec()
    const allVenues = await Venue.find().sort({name: 1}).exec()
    const event = await Event.findById(req.params.id)
    .populate('venue')
    .populate('organizer')
    .populate('participants')
    .exec()

    allParticipants.forEach((p) => {
        event.participants.forEach((participant) => {
            if (p.name === participant.name) p.checked = true
        })
    })

    res.render('eventForm', {
        title: 'Event form',
        event: event,
        organizers: allOrganizers,
        participants: allParticipants,
        venues: allVenues
    })
})

exports.postEventUpdateForm = asyncHandler(async(req, res, next) => {
    const venueObj = await Venue.findOne({ name: req.body.eventVenue }).exec()
    const organizerObj = await Organizer.findOne({ name: req.body.eventOrganizer }).exec()
    const participantArr = []
    if (!Array.isArray(req.body.eventParticipants)) {
        const p = await Participant.findOne({ name: req.body.eventParticipants }).exec()
        participantArr.push(p)
    } else {
        for (let i = 0; i < req.body.eventParticipants.length; i++) {
            const p = await Participant.findOne({ name: req.body.eventParticipants[i] }).exec()
            participantArr.push(p)
        }
    }

    const event = new Event({
        title: req.body.eventTitle,
        description: req.body.eventDescription,
        date: req.body.eventDate,
        time: req.body.eventTime,
        venue: venueObj,
        organizer: organizerObj,
        participants: participantArr,
        _id: req.params.id,
    })

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, event, {})
    res.redirect(updatedEvent.url)
})
