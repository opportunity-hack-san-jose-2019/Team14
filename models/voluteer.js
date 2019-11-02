const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const VoluteerSchema = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    cancelled: {
        type: Boolean
    },
    notes: {
        type: String
    },
    vip: {
        type: Boolean
    },
    station: {
        type: String
    },
    day: {
        type: String,
    },
    event_location: {
        type: String,
    },
    employer: {
        type: String,
    },
    title: {
        type: String,
    },
    industry: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    career_fields: {
        type: [String]
    },
    event_list: {
        type: [ObjectId]
    }
};

var Voluteer = mongoose.model('Voluteer', VoluteerSchema);

module.exports = { Voluteer, VoluteerSchema };