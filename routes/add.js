const {Router} = require('express');
const router = Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');
const {validationResult} = require("express-validator/check");
const {courseValidators} = require('../utils/validators');

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    })
});

router.post('/', auth, courseValidators, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('add',{
            title: 'Add course',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description,
            }
        })
    }
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        userId: req.user
    });
    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;
