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

exports.getParticipantForm = asyncHandler(async(req, res, next) => {
    res.render('participantForm', {
        title: 'Participant Form'
    })
})

exports.postParticipantForm = asyncHandler(async(req, res, next) => {
    const participant = new Participant({
        name: req.body.participantName,
        email: req.body.participantEmail,
        phone: parseInt(req.body.participantPhone)
    })
    await participant.save()
    res.redirect(participant.url)
})

exports.getDeleteParticipant = asyncHandler(async(req, res, next) => {
    res.render('deleteParticipant', { title: 'Delete participant' })
})

exports.postDeleteParticipant = asyncHandler(async(req, res, next) => {
    await Participant.findByIdAndDelete(req.params.id)
    res.redirect('/participants')
})

exports.getParticipantUpdateForm = asyncHandler(async(req, res, next) => {
    const participant = await Participant.findById(req.params.id)
    res.render('participantForm', { 
        title: 'Participant form', 
        participant: participant
    })
})

exports.postParticipantUpdateForm = asyncHandler(async(req, res, next) => {
    const participant = new Participant({
        name: req.body.participantName,
        email: req.body.participantEmail,
        phone: parseInt(req.body.participantPhone),
        _id: req.params.id
    })

    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, participant, {})
    res.redirect(updatedParticipant.url)
})

