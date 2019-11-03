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
        type: Array
    },
    event_list: {
        type: [ObjectId]
    }
};

var Voluteer = mongoose.model('Volunteer', VoluteerSchema);

module.exports = { Voluteer, VoluteerSchema };