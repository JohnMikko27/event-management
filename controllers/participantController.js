const Participant = require('../models/participant')
const asyncHandler = require('express-async-handler')

exports.getParticipantList = asyncHandler(async(req, res, next) => {
    const allParticipants = await Participant.find().sort({name: 1}).exec()

    res.render('participantList', {
        title: 'Participant List',
        participantList: allParticipants
    })
})