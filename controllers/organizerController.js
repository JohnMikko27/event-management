const Organizer = require('../models/organizer')
const asyncHandler = require('express-async-handler')

exports.getOrganizerList = asyncHandler(async(req, res, next) => {
    const allOrganizers = await Organizer.find().sort({name: 1}).exec()
    
    res.render('organizerList', {
        title: 'Organizer List', 
        organizerList: allOrganizers
    })
})
