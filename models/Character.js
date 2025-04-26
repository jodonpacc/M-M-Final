const db = require('../db.js');

const Character = db.model('Character', {
    user: {type: String, required: true},
    name: {type: String, required: true},
    charClass: {type: String, required: true},
    race: {type: String, required: true},
    background: {type: String, required: true},
    portrait: {
        data: Buffer,
        contentType: String
    },
    str: {type: Number, min: 1, max: 24, required: true},
    dex: {type: Number, min: 1, max: 24, required: true},
    con: {type: Number, min: 1, max: 24, required: true},
    intel: {type: Number, min: 1, max: 24, required: true},
    wis: {type: Number, min: 1, max: 24, required: true},
    cha: {type: Number, min: 1, max: 24, required: true} 
});

module.exports = Character;