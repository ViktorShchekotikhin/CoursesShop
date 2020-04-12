const {Router} = require('express');
const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');
const {validationResult} = require("express-validator/check");
const {courseValidators} = require('../utils/validators');

function isOwner(course, req){
    return course.userId.toString() === req.user._id.toString()
}
// get all
router.get('/', async (req,res)=>{
    try {
        // .populate('userId', 'email name') - get all user data, 2 param get concrete data
        // .select('email name') - get some from current schema
        const courses = await Course.find()
            .populate('userId', 'email name');
        res.render('courses', {
            title: 'Courses',
            isCourses: true,
            userId: req.user ? req.user._id.toString() : null,
            courses
        })
    } catch (e) {
        console.log(e)
    }

});
// get by id
router.get('/:id',  async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        })
    } catch (e) {
        console.log(e)
    }
});
// edit by id
router.get('/:id/edit', auth, async (req, res) =>  {
    if(!req.query.allow) {
        return res.redirect('/');
    }
    try{
        const course = await Course.findById(req.params.id);
        if(!isOwner(course, req)){
            return res.redirect('/courses');
        }
        res.render('course-edit', {
            title: `Edit ${course.title}`,
            course
        })
    } catch (e) {
        console.log(e)
    }

});
// update
router.post('/edit',  auth, courseValidators,  async (req, res) => {
    const errors = validationResult(req);
    const {id} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).redirect(`courses/${id}/edit?allow=true`)
    }

    try {

        delete req.body.id;
        const course = await Course.findById(id);
        if (!isOwner(course, req)){
            return res.redirect('/courses');
        }
        // change field
        Object.assign(course, req.body);
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }

});
// delete by id
router.post('/remove',  auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        });
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;
