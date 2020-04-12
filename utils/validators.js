const {body} = require('express-validator/check');
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Write correct mail!')
        .normalizeEmail()
        .custom(async (value , {reg}) => {
            try {
                const user = await User.findOne({email: value});
                if(user){
                    return Promise.reject('User with this email already exist!')
                }
            } catch (e) {
                console.log(e)
            }
        }),
    body('password', 'Password must be min 4 symbol')
        .isLength({min:4,max:56})
        .isAlphanumeric()
        .trim(),
    body('confirm').custom((value , {req})=>{
        if (value !== req.body.password){
            throw new Error('Passwords must match')
        }
        return true
    })
        .trim(),
    body('name', 'Name must be write only letters')
        .isAlpha()
        .trim()
];


exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Min title length - 3 symbols').trim(),
    body('price').isNumeric().withMessage('Incorrect price'),
    body('image', 'Write correct image url').isURL()
];
