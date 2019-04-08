module.exports = (extractSession) => {
    return async ({ req }, done) => {
        console.log('verifying client');
        try {
            const session = await extractSession(req);
            const hasSession = session && session.passport && session.passport.user;
            done(hasSession);
        } catch (e) {
            console.log(e);
            done(false);
        }
    };
};