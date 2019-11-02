const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://root:root@opportunityhackcluster-w3hia.mongodb.net/test?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { mongoose };