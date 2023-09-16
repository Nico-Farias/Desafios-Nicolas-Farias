import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport'
import persistence from '../persistence/daos/persistence.js';
const {userDao} = persistence;

const strategyOptions = {
    clientID: '689118910705-htthgfaunaculoqbreifl2qea88bg37g.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/users/oauth2/redirect/accounts.google.com',
    scope: [
        'profile', 'email'
    ],
    state: true
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {


    const email = profile._json.email;

    const user = await userDao.getByEmail(email);

    if (user) 
        return done(null, false);
    


    const newUser = await userDao.create({
        nombre: profile._json.given_name,
        apellido: profile._json.family_name,
        password: '',
        email,
        isGoogle: true
    })
    return done(null, newUser)

}

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})
