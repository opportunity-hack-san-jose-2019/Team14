const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = {
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    cover: {
        type: String
    },
    media: {
        type: [String]
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    location: {
        type: String,
    },
    students: {
        type: [Object], // email, status
    },
    volunteers: {
        type: [Object], // email, status
    },
};

var Event = mongoose.model('Event', EventSchema);

module.exports = { Event, EventSchema };