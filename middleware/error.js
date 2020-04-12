module.exports = function (req,res,next) {
    res.status(404).render('404page'),{
        title: 'Page not found'
    }
};
