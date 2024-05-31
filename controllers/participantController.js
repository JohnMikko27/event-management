const Participant = require('../models/participant')
const asyncHandler = require('express-async-handler')

exports.getParticipantList = asyncHandler(async(req, res, next) => {
    const allParticipants = await Participant.find().sort({name: 1}).exec()

    res.render('participantList', {
        title: 'Participant List',
        participantList: allParticipants
    })
})

exports.getParticipantDetails = asyncHandler(async(req, res, next) => {
    const participant = await Participant.findById(req.params.id).exec()

    // No results
    if (participant === null) {
        const err = new Error("Event not found");
        err.status = 404;
        return next(err);
    }

    res.render('participantDetails', {
        title: 'Participant Details',
        participant: participant,
    })
})