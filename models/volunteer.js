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
<<<<<<< HEAD:models/voluteer.js
        type: Array
=======
        type: [Object]
>>>>>>> aebb0d5d2b2edb91484005616486c33780795d24:models/volunteer.js
    },
    event_list: {
        type: [ObjectId]
    }
};

<<<<<<< HEAD:models/voluteer.js
var Voluteer = mongoose.model('Volunteer', VoluteerSchema);
=======
var Volunteer = mongoose.model('Volunteer', VolunteerSchema);
>>>>>>> aebb0d5d2b2edb91484005616486c33780795d24:models/volunteer.js

module.exports = { Volunteer, VolunteerSchema };