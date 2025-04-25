const express = require ('express');
const Character = require('./models/Character.js');
const User = require('./models/User.js');
const app = express();

app.set('view engine','pug');


app.get('/', (req, resp) => {
    resp.render('index');
});

app.use('/pictures',express.static(process.cwd()+'/pictures'));

app.get('/classes', (req, resp) => {
    resp.render('classes',{ health: '100', readyToLevel: true});
});
app.get('/portrait', (req,resp) => {
    resp.render('portrait');
});
app.get('/backgrounds', (req,resp) => {
    resp.render('backgrounds');
});
app.get('/races', (req,resp) => {
    resp.render('races');
});



app.use(express.static("public"));

app.listen(3006, function() {
    console.log("Listening!");
 });