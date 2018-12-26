require('dotenv').config();

var PORT = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
process.env.DIRNAME = path.dirname(require.main.filename);

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var middleware = require('webpack-dev-middleware');
var compiler = webpack(webpackConfig);
var apis = require('./src/apis/index');

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(middleware(compiler, webpackConfig.devServer));

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * API 구현체를 모듈로 따로 분리하여 관리합니다.
 * fileApi : Json 읽기/쓰기
 */
apis(app);

app.get('/login', function(req, res){
	res.render('loginTest');
});

app.get('/success', function(req, res){
    // console.log(req.user)
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

