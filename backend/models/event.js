const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = {
    time: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    students: {
        type: Array, // ItemSchema = {StudentId, SkillId, Status}
    },
    voluteers: {
        type: Array, // ItemSchema = {VoluteerId, SkillId, Status}
    },
};

var Event = mongoose.model('Event', EventSchema);

module.exports = { Event, EventSchema };