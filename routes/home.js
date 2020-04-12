const {Router} = require('express');
const router = Router();

router.get('/', (req,res)=>{
    // res.status(200);
    // Обычный html
    // res.sendFile(path.join(__dirname, 'views', 'index.hbs'));
    // hbs
    res.render('index', {
        title: 'Home page',
        isHome: true
    });
});

module.exports = router;
