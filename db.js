const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final');
module.exports = mongoose;