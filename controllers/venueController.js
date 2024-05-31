const Venue = require('../models/venue')
const asyncHandler = require('express-async-handler')

exports.getVenueList = asyncHandler(async(req, res, next) => {
    const allVenues = await Venue.find().sort({name: 1}).exec()

    res.render('venueList', {
        title: 'Venue List',
        venueList: allVenues
    })
})