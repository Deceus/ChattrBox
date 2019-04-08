const KoaRouter = require('koa-router');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('./db');
const CLIENT_ID = process.env.OAUTH_ID;
const CLIENT_SECRET = process.env.OAUTH_SECRET;
const CLIENT_CALLBACK = process.env.OAUTH_CALLBACK;

module.exports = ({ passport }) => {
    passport.use(new GoogleStrategy({ clientID: CLIENT_ID, clientSecret: CLIENT_SECRET, callbackURL: CLIENT_CALLBACK }, (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        User.findOrCreate({ email }, { name }, done);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });

    const api = KoaRouter();
    api.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    api.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
    return api;
};

module.exports.redirect = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return await next();
    }
    ctx.redirect('/auth/google');
};