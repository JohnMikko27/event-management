const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrganizerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
})

OrganizerSchema.virtual("url").get(function() {
    return `/organizer/${this._id}`
})

module.exports = mongoose.model("Organizer", OrganizerSchema)