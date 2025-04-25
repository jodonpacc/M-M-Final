const db = require('../db.js');

const User = db.model('User', {
    username: String,
    //password: must implement later with hashing/salting/tokens
});

module.exports = User;