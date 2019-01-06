var path = require('path');
var fs = require('fs');
var formidable = require('formidable');

var utils = require('../utils');
var appPath = path.join(process.env.DIRNAME, 'public');

module.exports = function(app){
	/**
	 * @api {GET} /api/getJson Json 파일 반환
	 * 	@apiName getJson
	 *
	 * 	query:
	 * 		@filepath {String} json 파일경로
	 *
	 * 	@apiSuccess {Json}
	 */
    app.get(`/api/getJson`, function(req, res, next){
        var filePath = req.query.filepath,
        	resultData;

        if (!filePath) {
            next(new Error('파일경로(filePath)는 필수값입니다.'));
        }

        if (!filePath.match(/.json$/)) {
        	next(new Error('Json 파일이 아닙니다.'));
        }

        resultData = utils.getJson(utils.APP_PATH + filePath);

        return res.send(resultData);
    });

    /**
	 * @api {PUT} /api/updateJson Json 파일 업데이트
	 * 	@apiName updateJson
	 *
	 * 	body:
	 * 		@filePath {String} json 파일경로
	 *
	 * 	@apiSuccess {Boolean} success/fail
	 */
    app.put(`/api/updateJson`, function(req, res, next){
        var filePath = req.query.filepath,
        	resultData;

        if (!filePath) {
            next(new Error('파일경로(filePath)는 필수값입니다.'));
        }

        if (!filePath.match(/.json$/)) {
        	next(new Error('Json 파일이 아닙니다.'));
        }

        utils.getJson(utils.APP_PATH + filePath);

        return res.send(resultData);
    });

    app.get('/file_test', function(req, res) {
        res.render('filetest');
    });

    app.post('/api/upload_file', function(req, res) {
        // console.log(req.files.test);
        // if (!req.files.test) {
        //     res.status(403).send('파일을 올려주세요');
        // }

        // utils.uploadDataToS3('test-aws-sdk-kkb', req.files.test.name, req.files.test.data, data => {
        //     res.status(200).send({
        //         error: 0,
        //         message: '정상적으로 업로드 되었습니다.' 
        //      });
        // });

        var form = form = new formidable.IncomingForm({
            encoding: 'utf-8',
            multiples: true,
            keepExtensions: false //확장자 제거
        });

        form.parse(req, function (err, fields, files) {

        });

        form.on('error', function (err) {
            console.log('error', err);
            
            callback(err, null);
        });
        form.on('end', function () {
            console.log('end');
            console.log(this);

            utils.uploadDataToS3('test-aws-sdk-kkb', this.openedFiles[0].name, fs.createReadStream(this.openedFiles[0].path), data => {
                res.status(200).send({
                    error: 0,
                    message: '정상적으로 업로드 되었습니다.' 
                });
            });
            
            // callback(null, this.openedFiles);
        });
        form.on('aborted', function () {
            console.log('aborted');

            // callback('form.on(aborted)', null);
        });
    });


    app.get('/api/get_file', function(req, res) {

        // var form = form = new formidable.IncomingForm({
        //     encoding: 'utf-8',
        //     multiples: true,
        //     keepExtensions: false //확장자 제거
        // });

        // form.parse(function (err, fields, files) {

        // });

        // form.on('error', function (err) {
        //     console.log('error', err);
            
        //     callback(err, null);
        // });
        // form.on('end', function () {
        //     console.log('end');

        //     callback(null, this.openedFiles);
        // });
        // form.on('aborted', function () {
        //     console.log('aborted');

        //     callback('form.on(aborted)', null);
        // });


        utils.getDataFromS3('test-aws-sdk-kkb', 'icon_arrow_down_white@2x.png', data => {
            console.log(data.Body);
            var fileContents = Buffer.from(data.Body, "base64");
            console.log(fileContents);
            return res.send(fileContents);
        });
    })

}