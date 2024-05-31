// display list of events
// display detail page for an event
// display event form
// handle post request on event form
// handle delete request 
// display form for updating
// handle update request

const Event = require('../models/event')
const asyncHandler = require('express-async-handler')

exports.getEventList = asyncHandler(async(req, res, next) => {
    const allEvents = await Event.find().sort({ title: 1 }).exec();

    res.render("eventList", {
        title: "Event List",
        eventList: allEvents,
    });
})

exports.eventDetail = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event detail')
})

exports.eventForm = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event form')
})

exports.eventPost = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event post')
})

exports.eventDelete = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event delete')
})

exports.eventUpdateFormGet = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event update form get')
})

exports.eventUpdateFormPost = asyncHandler(async(req, res, next) => {
    res.send('not implemented yet: event update form post')
})
