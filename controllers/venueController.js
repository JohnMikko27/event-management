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

exports.getVenueForm = asyncHandler(async(req, res, next) => {
    res.render('venueForm', {
        title: 'Venue Form'
    })
})

exports.postVenueForm = asyncHandler(async(req, res, next) => {
    const venue = new Venue( {
        name: req.body.venueName,
        address: req.body.venueAddress,
        capacity: req.body.venueCapacity,
    })
    
    await venue.save()
    res.redirect(venue.url)
})

exports.getDeleteVenue = asyncHandler(async(req, res, next) => {
    res.render('deleteVenue', { title: 'Delete Venue'})
})

exports.postDeleteVenue = asyncHandler(async(req, res, next) => {
    await Venue.findByIdAndDelete(req.params.id)
    res.redirect('/venues')
})

exports.getVenueUpdateForm = asyncHandler(async(req, res, next) => {
    const venue = await Venue.findById(req.params.id)
    res.render('venueForm', { 
        title: 'Venue form',
        venue: venue
    })
})

exports.postVenueUpdateForm = asyncHandler(async(req, res, next) => {
    const venue = new Venue({
        name: req.body.venueName,
        address: req.body.venueAdress,
        capacity: req.body.venueCapacity,
        _id: req.params.id
    })

    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, venue, {})
    res.redirect(updatedVenue.url)
})