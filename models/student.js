const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const StudentSchema = {
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
    cohort: {
        type: String,
    },
    evening: {
        type: String,
    },
    location:{
        type: String,
    },
    phone: {
        type: String
    },
    interests: {
        type: [Object]
    },
    attendance: {
        type: Number,
    },
    module_score: {
        type: Number,
    },
    project_score: {
        type: Number
    },
    bonus: {
        type: Number
    },
    total_score: {
        type: Number
    },
    event_list: {
        type: [ObjectId]
    }
};

var Student = mongoose.model('Student', StudentSchema);

module.exports = { Student, StudentSchema };