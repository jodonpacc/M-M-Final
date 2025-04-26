const express = require ('express');
const Character = require('./models/Character.js');
const User = require('./models/User.js');
const app = express();

//temporary username hard-coded for testing
const username = 'jodonne1@trinity.edu';

app.use(express.json({ limit: '20mb' }));

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

app.post('/saveChar', async (req,res) => {
    try {
        let body = req.body;
        let dataURL = body.portrait;
        let [, contentType, encoded] = dataURL.match(/^data:(image\/\w+);base64,(.+)$/);
        let portrait = {
            data: Buffer.from(encoded, 'base64'),
            contentType
        };
        const character = new Character({
            user: username,
            name: body.charName,
            charClass: body.charClass,
            race: body.charRace,
            background: body.charBack,
            portrait: portrait,
            str: body.str,
            dex: body.dex,
            con: body.con,
            intel: body.intel,
            wis: body.wis,
            cha: body.cha
        });
        await character.save();
        res.render('index')
    } catch (e) {
        res.status(400).send(e.message);
    } 
});

app.use(express.static("public"));

app.listen(3006, function() {
    console.log("Listening!");
 });