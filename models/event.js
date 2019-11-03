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
    time: {
        type: Date,
    },
    location: {
        type: String,
    },
    students: {
        type: [Object], // student_id, status
    },
    voluteers: {
        type: [Object], // volunteer_id, status
    },
};

var Event = mongoose.model('Event', EventSchema);

module.exports = { Event, EventSchema };