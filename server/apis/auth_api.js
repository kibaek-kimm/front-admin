const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const session = require('express-session');
const jwtUtil = require('../jwt');
var redirectUrl = '/';

passport.serializeUser(function(user, done) {
    console.log('\n======');
    console.log('\x1b[32m%s\x1b[0m', '[[[[passport.serializeUser]]]] ');
    console.log('\n');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('\n======');
    console.log('\x1b[32m%s\x1b[0m', '[[[[passport.deserializeUser]]]] ');
    console.log('\n');
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        console.log('\n======');
        console.log('\x1b[32m%s\x1b[0m', '[[[[Passport user GoogleStrategy callback]]]]');
        console.log('accessToken : ',accessToken);
        console.log('refreshToken : ',refreshToken);
        console.log('\n');
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
        console.log('\n======');
        console.log('\x1b[32m%s\x1b[0m', '[[[[ /auth/google/callback]]]]');
        // console.log(res)

        // jwt 생성 후 token값 session에 삽입
        // redirect는 쿼리스트링이 있다면 그 링크로, 아니면 메인으로
        res.redirect('/success');
    });

    app.get('/api/get_jwt', function(req, res) {
        var token = null;
        console.log('before clear token: ');
        console.log('req.session.token: ', req.session.token);
        if (req.session && req.session.token) {
            token = req.session.token;
            req.session.destroy();
        }

        console.log('clear token: ');
        console.log('token: ', token);

        res.send({
            token: token
        });
    });

    app.post('/api/verify_jwt', (req, res) => {
        console.log(req.headers.authorization);
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwtUtil.verify(token, (decoded, err) => {
                if (err) {
                    res.status(403).send({
                        error: err
                    });
                } else {
                    res.send({
                        verify: decoded
                    });
                }
                
            });
        } else {
            res.status(400).send({
                message: 'token값은 필수입니다.'
            })
        }
    });

    app.get('/api/get_sess', function(req, res) {
        res.send(req.session);
    });

    app.get('/login', function(req, res){
        if (req.query.r) {
            redirectUrl = req.query.r;
        }
        
    	res.render('login');
    });

    app.get('/success', function(req, res){
        console.log('\n======');
        console.log('\x1b[32m%s\x1b[0m', '[[[[ /success]]]]');
        console.log('\n');

        var userInfo = req.session.passport.user;

        jwtUtil.sign({
            'name': userInfo.displayName,
            'email': userInfo.email
        }, null, function(token) {
            console.log('token : ', token);
            req.session.token = token;
            // res.render('loginSuccess');
            res.redirect(redirectUrl);
        });

        //jwt토큰 발행
        // res.redirect('/success');
        
    });
}
