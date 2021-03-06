const {Router} = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {validationResult} = require('express-validator/check');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const keys = require('../keys');
const router = Router();
const User = require('../models/user');
const regEmail = require('../emails/registration');
const resetEmail = require('../emails/reset');
const {registerValidators} = require('../utils/validators');

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: keys.SENDGRID_API_KEY
    }
}));

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        regError: req.flash('regError'),
        logError: req.flash('logError')
    })
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/');
                })
            } else {
                req.flash('logError', 'Password incorrect!');
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('logError', 'User does not exist!');
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e)
    }
});

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Forgot password',
        isLogin: true,
        error: req.flash('error'),
    })
});

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buferr) => {
            if (err) {
                req.flash('error', 'Something happened, try latter! (Crypto)');
                res.redirect('/auth/reset')
            }
            const token = buferr.toString('hex');
            const candidate = await User.findOne({email: req.body.email});

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
                await candidate.save();
                await transporter.sendMail(resetEmail(candidate, token));
                res.redirect('/auth/login')
            } else {
                req.flash('error', 'This email not found! (Crypto)');
                res.redirect('/auth/reset')
            }
        })
    } catch (e) {

    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    });
});

router.post('/registration', registerValidators, async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register')
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email, name, password: hashPassword, cart: {items: []}
        });
        await user.save();
        res.redirect('/auth/login#login');
        await transporter.sendMail(regEmail(email, name))

    } catch (e) {
        console.log(e)
    }
});

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        });
        if (!user) {
            return res.redirect('/auth/login')
        } else {
            res.render('auth/password', {
                title: 'Renew password',
                error: req.flash('error'),
                userID: user._id.toString(),
                token: req.params.token
            })
        }
    } catch (e) {
        console.log(e)
    }
});

router.post('/password', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userID,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        });
        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();
            res.redirect('/auth/login')
        } else {
            return res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;
