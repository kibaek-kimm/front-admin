const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const session = require('express-session');
const jwtUtil = require('../jwt');
var redirectUrl = '/';

/**
 * 로그인 직전 페이지로 다시 redirect 할수 있도록 처리
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const setRedirect = (req, res, next) => {
    if (req.query.r) {
        redirectUrl = req.query.r;
    } else {
        redirectUrl = '/';
    }
    console.log('setRedirect 미들웨어');
    console.log(redirectUrl);
    next();
};

passport.serializeUser(function(user, done) {
    console.log('\x1b[32m%s\x1b[0m', '[[[[passport.serializeUser]]]] ');
    console.log('\n');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('\x1b[32m%s\x1b[0m', '[[[[passport.deserializeUser]]]] ');
    console.log('\n');
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        console.log('\x1b[32m%s\x1b[0m', '[[[[Passport user GoogleStrategy callback]]]]');
        console.log('accessToken : ',accessToken);
        console.log('refreshToken : ',refreshToken);
        console.log('\n');

        process.nextTick(function() {
            user = profile;
            return done(null, user);
        });
    }
));


module.exports = function(app){
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', setRedirect, passport.authenticate('google', {
        scope: ['profile', 'email'],
        hostedDomain: 'peoplefund.co.kr'
    }));

    app.get('/auth/google/callback', passport.authenticate( 'google', {
        failureRedirect: '/login'
    }), function(req, res) {
        console.log('\x1b[32m%s\x1b[0m', '[[[[ /auth/google/callback]]]]');
        console.log('\n');
        // console.log(res)

        // jwt 생성 후 token값 session에 삽입
        // redirect는 쿼리스트링이 있다면 그 링크로, 아니면 메인으로
        res.redirect('/success');
    });

    app.get('/api/auth', function(req, res) {
        var sess = req.session;
        if (
            sess.passport
            && sess.passport.user
            && sess.passport.user.emails)
        {
            const userInfo = sess.passport.user;
            res.send({
                name: userInfo.displayName,
                email: userInfo.emails[0].value
            });
        } else {
            res.status(404).send({
                status: 404,
                message: '유저 정보가 없습니다.'
            });
        }
    });

    app.get('/api/logout', setRedirect, function(req, res) {
        var sess = req.session;
        if (
            sess.passport
            && sess.passport.user
            && sess.passport.user.emails)
        {
            req.session.destroy(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({
                        message: '정상적으로 로그아웃 되었습니다.'
                    });
                }
            })
        } else {
            res.status(404).send({
                message: '로그인 유저가 아닙니다.'
            });
        }
    });

    // app.get('/login', function(req, res){
    //     console.log(req.session);
    //     if (req.query.r) {
    //         redirectUrl = req.query.r;
    //     }
        
    // 	res.render('login');
    // });

    app.get('/success', function(req, res){
        console.log('\x1b[32m%s\x1b[0m', '[[[[ /success]]]]');
        console.log(req.session);
        console.log('\n');
        var userInfo = req.session.passport.user;
        res.redirect(redirectUrl);
    });
}
