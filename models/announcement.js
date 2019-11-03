const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const contactListSchema = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    students: {
        type: [ObjectId],
    },
    volunteers: {
        type: [ObjectId],
    },
};

var contactList = mongoose.model('contactList', contactListSchema);

module.exports = { contactList, contactListSchema };