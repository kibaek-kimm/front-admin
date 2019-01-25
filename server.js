require('dotenv').config();

var PORT = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var session = require('express-session');
const jwt = require('jsonwebtoken');
process.env.DIRNAME = path.dirname(require.main.filename);

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var middleware = require('webpack-dev-middleware');
var compiler = webpack(webpackConfig);
var apis = require('./server/apis/index');

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(middleware(compiler, webpackConfig.devServer));

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
API 권한체크
app.use(function(req, res, next) {
    if (authenticate success) {
        next()
    } else {
        res.status(403).send('권한이 없습니다.');
    }
});
*/

/**
 * API 구현체를 모듈로 따로 분리하여 관리합니다.
 * fileApi : Json 읽기/쓰기
 */
apis(app);

app.get('/login', function(req, res){
	res.render('loginTest');
});

app.get('/success', function(req, res){
    const userInfo = req.session.passport.user;
    
    /*
    [Payload : Claims]
    Reserved claims : 이미 예약된 Claim. 필수는 아니지만 사용하길 권장. key 는 모두 3자리 String이다.
    - iss: 토큰 발급자 (issuer)
    - sub: 토큰 제목 (subject)
    - aud: 토큰 대상자 (audience)
    - exp: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며 (예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어있어야합니다.
    - nbf: Not Before 를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
    - iat: 토큰이 발급된 시간 (issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
    - jti: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.

    
    Public claims : 사용자 정의 Claim.
    Public 이라는 이름처럼 공개용 정보
    충돌 방지를 위해 URI 포맷을 이용해 저장한다.
    
    
    [Signature]
    Header와 Payload의 데이터 무결성과 변조 방지를 위한 서명
    Header + Payload 를 합친 후, Secret 키와 함께 Header의 해싱 알고리즘으로 인코딩
    
    대략 18 = 1초
    */
    
    const header = {
        subject: 'userInfo'
    };
    
    const payload = {
        'iss': 'peoplefund',
        'exp': new Date().getTime() + (18 * 60 * 5), // 10분
        'peoplefund.username': userInfo.displayName,
        'peoplefund.email': userInfo.emails
    };
    
    jwt.sign(payload, process.env.AUTH_SECRET_KEY, header, (err, token) => {
        console.log(token);
        console.log(err);
        console.log('jwt published success');
    });
    
    //jwt토큰 발행
	res.render('loginSuccess');
});

app.get('/*', function(req, res){
    res.render('index', {
    	metaTitle: '프론트 어드민',
		path: ''
    });
});

app.use(function(error, req, res, next){
    console.log('error!!!');
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
});

app.listen(PORT, function(){
    console.log('Listening on PORT ' + PORT);
})

