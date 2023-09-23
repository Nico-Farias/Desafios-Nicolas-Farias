import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './passport/localStrategy.js'
import './passport/googleStrategy.js'
import MainRouter from './routes/indexRouter.js';
import {errorHandler} from './middlewares/errorHandler.js';

const mainRouter = new MainRouter()


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
/*
app.use(passport.initialize())
app.use(passport.session())
*/


app.use('/api', mainRouter.getRouter())
// app.use('/', viewsRouter)
app.use(errorHandler)


app.listen(8080, () => {
    console.log('🚀 Server corriendo en puerto 8080');
});
