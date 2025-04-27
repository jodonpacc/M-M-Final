const jwt = require('jwt-simple');
const User = require('../models/User.js');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

const secret = 'SorcerersOfTheBeach';

router.post('/user', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username and/or password"});
        return;
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
    
    const newUser = new User({
        username: req.body.username,
        passHash: hash,
        status: req.body.status
    });

    try {
        await newUser.save();
        res.sendStatus(201);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/auth', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({error: 'Missing username and/or password'});
    }

    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(401).json({error: 'Username does not exist'});
        } else {
            if (bcrypt.compareSync(req.body.password, user.passHash)) {
                const token = jwt.encode({username: user.username}, secret);
                res.cookie('user', user.username, {
                    httpOnly: true,
                    sameSite: 'lax'
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'lax'
                });
                return res.redirect('/');
            } else {
                res.status(401).json({error: "Password incorrect"});
            }
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;