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
