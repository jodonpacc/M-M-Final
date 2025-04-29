const jwt = require('jwt-simple');
const User = require('../models/User.js');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

const secret = 'SorcerersOfTheBeach';

router.post('/user', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.redirect(`/login?error=${encodeURIComponent('Missing username/password')}`);
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
        const token = jwt.encode({username: newUser.username}, secret);
                res.cookie('user', newUser.username, {
                    httpOnly: true,
                    sameSite: 'lax'
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'lax'
                });
                return res.redirect('/');
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/auth', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.redirect(`/login?error=${encodeURIComponent('Missing username/password')}`);
    }

    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.redirect(`/login?error=${encodeURIComponent('Username/password invalid')}`);
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
                res.redirect(`/login?error=${encodeURIComponent('Username/password invalid')}`);
            }
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;