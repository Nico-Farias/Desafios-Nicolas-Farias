import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import './db/connection.js';
import MongoStore from 'connect-mongo';
import {connectionDB} from './db/connection.js';
import handlebars from 'handlebars';
import {__dirname} from './utils.js';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import expressHandlebars from 'express-handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import passport from 'passport';
import './passport/localStrategy.js'
import './passport/googleStrategy.js'


const mongoStoreOptions = {
    store: MongoStore.create(
        {mongoUrl: connectionDB}
    ),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 360000
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const hbs = expressHandlebars.create({defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(handlebars)});


app.engine('handlebars', hbs.engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(passport.initialize())
app.use(passport.session())

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/', viewsRouter);

app.listen(8080, () => {
    console.log('🚀 Server corriendo en puerto 8080');
});
