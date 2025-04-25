const db = require('../db.js');

const Character = db.model('Character', {
    user: String,
    name: String,
    charClass: String,
    race: String,
    background: String,
    portrait: {
        data: Buffer,
        contentType: String
    },
    str: {type: Number, min: 1, max: 24},
    dex: {type: Number, min: 1, max: 24},
    con: {type: Number, min: 1, max: 24},
    intel: {type: Number, min: 1, max: 24},
    wis: {type: Number, min: 1, max: 24},
    cha: {type: Number, min: 1, max: 24} 
});

module.exports = Character;