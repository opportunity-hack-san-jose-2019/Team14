const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = {
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    event_id: {
        type: ObjectId
    },
    user_email: {
        type: String
    },
    seen: {
        type: Boolean
    },
    checked: {
        type: Boolean,
    }
};

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification, NotificationSchema };