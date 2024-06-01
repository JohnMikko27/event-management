const Organizer = require('../models/organizer')
const asyncHandler = require('express-async-handler')

exports.getOrganizerList = asyncHandler(async(req, res, next) => {
    const allOrganizers = await Organizer.find().sort({name: 1}).exec()

    res.render('organizerList', {
        title: 'Organizer List', 
        organizerList: allOrganizers
    })
})

exports.getOrganizerDetails = asyncHandler(async(req, res, next) => {
    const organizer = await Organizer.findById(req.params.id).exec()

    // No results
    if (organizer === null) {
        const err = new Error("Event not found");
        err.status = 404;
        return next(err);
    }

    res.render('organizerDetails', {
        title: 'Organizer Details',
        organizer: organizer,
    })
})

exports.getOrganizerForm = asyncHandler(async(req, res, next) => {
    res.render('organizerForm', {
        title: 'Organizer Form'
    })
})

exports.postOrganizerForm = asyncHandler(async(req, res, next) => {
    const organizer = new Organizer({
        name: req.body.organizerName,
        email: req.body.organizerEmail,
        phone: parseInt(req.body.organizerPhone)
    })

    await organizer.save()
    res.redirect(organizer.url)
})

exports.getDeleteOrganizer = asyncHandler(async(req, res, next) => {
    res.render('deleteOrganizer', {title: 'Delete organizer'})
})

exports.postDeleteOrganizer = asyncHandler(async(req, res, next) => {
    await Organizer.findByIdAndDelete(req.params.id)
    res.redirect('/organizers')
})

exports.getOrganizerUpdateForm = asyncHandler(async(req, res, next) => {
    const organizer = await Organizer.findById(req.params.id)
    console.log(organizer)
    res.render('organizerForm', { 
        title: 'Organizer form',
        organizer: organizer
    })
})

exports.postOrganizerUpdateForm = asyncHandler(async(req, res, next) => {
    const organizer = new Organizer({
        name: req.body.organizerName,
        email: req.body.organizerEmail,
        phone: parseInt(req.body.organizerPhone),
        _id: req.params.id
    })

    const updatedOrganizer = await Organizer.findByIdAndUpdate(req.params.id, organizer, {})
    res.redirect(updatedOrganizer.url)
})