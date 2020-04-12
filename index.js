const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const compression = require('compression')
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const varMiddelware = require('./middleware/variable');
const userMiddelware = require('./middleware/user');
const errorHandler = require('./middleware/error');
const fileMiddelware = require('./middleware/file');
const keys = require('./keys');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

// посмотреть что принимает cmd + click on create
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
// регистрация в експерессе что вообще есть такой движок
app.engine('hbs', hbs.engine);
// начинаем использовать движок
app.set('view engine', 'hbs');
// папка где хранятся все шаблоны, 2 параметр папка
app.set('views','views' );
// регистрация папки как статической
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
// аля middleware for hbs
app.use(express.urlencoded({
    extended: true
}));

// sessions setting
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: store
    store
}));
// middlewares
app.use(fileMiddelware.single('avatar'));
// user token
app.use(csrf());
//errors
app.use(flash());
//res headers
app.use(helmet());
//compress static files
app.use(compression());
app.use(varMiddelware);
app.use(userMiddelware);

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// 404 middleware
app.use(errorHandler);

async function start() {
    try {
        await  mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        mongoose.set('useUnifiedTopology', true);
        app.listen(PORT, ()=>{
            console.log(`Server is running on port - ${PORT}`)
        });
    } catch (e) {
        console.error(e);
    }
}
start();

