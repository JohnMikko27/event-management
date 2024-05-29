const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    Venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true},
    organizer: { type: Schema.Types.ObjectId, ref: "Organizer", required: true},
    participants: [{ type: Schema.Types.ObjectId, ref: "Participant", required: true}]
})

EventSchema.virtual("url").get(function () {
    return `/event/${this._id}`;
});

module.exports = mongoose.model("Event", EventSchema);



// name
// description
// date/time
// Venue
// organizers (Organizer array)
// participants (Participant array)