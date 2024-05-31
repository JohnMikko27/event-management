const Venue = require('../models/venue')
const asyncHandler = require('express-async-handler')

exports.getVenueList = asyncHandler(async(req, res, next) => {
    const allVenues = await Venue.find().sort({name: 1}).exec()

    res.render('venueList', {
        title: 'Venue List',
        venueList: allVenues
    })
})

exports.getVenueDetails = asyncHandler(async(req, res, next) => {
    const venue = await Venue.findById(req.params.id).exec()

    // No results
    if (venue === null) {
        const err = new Error("Event not found");
        err.status = 404;
        return next(err);
    }

    res.render('venueDetails', {
        title: 'Venue Details',
        venue: venue,
    })
})