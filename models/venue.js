const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VenueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true }
})

VenueSchema.virtual("url").get(function() {
    return `/venue/${this._id}`
})

module.exports = mongoose.model("Venue", VenueSchema)