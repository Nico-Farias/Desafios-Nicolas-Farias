import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import persistence from '../daos/persistence.js';
const {userDao} = persistence;

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, done) => {
    try {
        const user = await userDao.getByEmail(email)
        console.log(user)
        if (user) 
            return done(null, false);
        


        const newUser = await userDao.create(req.body)
        return done(null, newUser)


    } catch (error) {
        console.log(error)
    }
}

const login = async (req, email, password, done) => {
    try {
        const user = {
            email,
            password
        }
        const loginUser = await userDao.login(user)

        if (! loginUser) {
            return done(null, false, {message: 'User not found'});
        } else {
            return done(null, loginUser)
        }

    } catch (error) {
        console.log(error.message)
    }
}


const registerStrategy = new LocalStrategy(strategyOptions, register)
const loginStrategy = new LocalStrategy(strategyOptions, login)

passport.use('login', loginStrategy)
passport.use('register', registerStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getUserById(id)
    return done(null, user)
})
