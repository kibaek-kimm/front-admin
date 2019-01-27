const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const session = require('express-session');
const jwtUtil = require('../jwt');
var redirectUrl = '/';

passport.serializeUser(function(user, done) {
    console.log('\x1b[31m%s\x1b[0m', 'passport.serializeUser ');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('\x1b[31m%s\x1b[0m', 'passport.deserializeUser ');
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {

        console.log('\x1b[31m%s\x1b[0m', 'Passport user GoogleStrategy callback');
        console.log('accessToken : ',accessToken);
        console.log('refreshToken : ',refreshToken);
        // console.log('profile : ',profile);

        process.nextTick(function() {
            user = profile;
            // console.log(profile);

            return done(null, user);
        });
    }
));


module.exports = function(app){
    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        hostedDomain: 'peoplefund.co.kr'
    }));

    app.get('/auth/google/callback', passport.authenticate( 'google', {
        failureRedirect: '/login'
    }), function(req, res) {
        console.log('\x1b[31m%s\x1b[0m', '/auth/google/callback ');
        console.log('/auth/google/callback')
        // console.log(res)

        // jwt 생성 후 token값 session에 삽입
        // redirect는 쿼리스트링이 있다면 그 링크로, 아니면 메인으로
        res.redirect('/success');
    });

    app.get('/login', function(req, res){
        if (req.query.r) {
            redirectUrl = req.query.r;
        }
    	res.render('loginTest');
    });

    app.get('/success', function(req, res){
        const userInfo = req.session.passport.user;

        jwtUtil.sign({
            'name': userInfo.displayName,
            'email': userInfo.email
        });
        //jwt토큰 발행
    	res.redirect(redirectUrl);
    });
}
