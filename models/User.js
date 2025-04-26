const db = require('../db.js');

const User = db.model('User', {
    username: {type: String, required: true}
    //password: must implement later with hashing/salting/tokens
});

module.exports = User;