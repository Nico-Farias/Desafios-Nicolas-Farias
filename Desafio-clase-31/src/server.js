import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './passport/localStrategy.js'
import './passport/googleStrategy.js'
import MainRouter from './routes/indexRouter.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {logguer} from './utils/logguer.js';
import {swaggerOptions} from './docs/info.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const mainRouter = new MainRouter()


const app = express();

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(express.urlencoded({extended: true}));

/*
app.use(passport.initialize())
app.use(passport.session())
*/


app.use('/api', mainRouter.getRouter());
app.get('/logguers', (req, res) => {
    logguer.info('PROBANDO LOGGUER')

    logguer.debug('Debug')
    logguer.verbose('Verbose')
    logguer.http('Http')
    logguer.info('Info')
    logguer.warn('Warning')
    logguer.error('Error')

    res.json({msg: 'Probando logguer'})
});
app.use(errorHandler);


app.listen(8080, () => {
    logguer.info('🚀 Server corriendo en puerto 8080');
});


export default app;
