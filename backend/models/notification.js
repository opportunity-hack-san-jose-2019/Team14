const mongoose = require('mongoose');

const NotificationSchema = {
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    metadata: {
        type: Object,
    },
};

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification, NotificationSchema };