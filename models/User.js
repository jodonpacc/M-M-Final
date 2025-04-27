const db = require('../db.js');

const User = db.model('User', {
    username: {type: String, required: true},
    passHash: {type: String, required: true},
    status: String
});

module.exports = User;