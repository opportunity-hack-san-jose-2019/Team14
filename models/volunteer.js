const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const VolunteerSchema = {
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
    },
    last: {
        type: String,
    },
    full_name: {
        type: String,
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
    title_industry: {
        type: String,
    },
    city_state: {
        type: String,
    },
    career_fields: {
        type: [Object]
    },
    event_list: {
        type: [ObjectId]
    },
    notifications: {
        type: [ObjectId],
    }
};

var Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = { Volunteer, VolunteerSchema };