const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/UsersDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./user');
require('./post');