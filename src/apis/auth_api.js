const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const session = require('express-session')

passport.serializeUser(function(user, done) {
    console.log('serializeUser : ',user);    
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser : ',user);    
    done(null, obj);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        console.log('accessToken : ',accessToken);
        console.log('\n');
        console.log('refreshToken : ',refreshToken);
        console.log('\n');
        // console.log('profile : ',profile);
        // console.log('\n');

        process.nextTick(function() {
            console.log(11111);
            
            user = profile;
            return done(null, user);
        });
    }
));


module.exports = function(app){
    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }));
    
    app.get('/auth/google/callback', passport.authenticate( 'google', {
        failureRedirect: '/login'
    }), function(req, res) {
        console.log('/auth/google/callback')
        console.log(res)
        //jwt토큰 발행
        res.redirect('/success'); 
    });
}