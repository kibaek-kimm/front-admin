var path    =  require('path');
var fs      = require('fs');
var utils   = require('../utils');
var jwtUtil = require('../jwt');

/**
 * API Modules import
 */
var fileApi     = require('./file_api');
var noticeApi   = require('./notice_api');
var recruitApi  = require('./recruit_api');
var peopleApi   = require('./people_api');
var authApi     = require('./auth_api');

module.exports = function(app){
    app.use(function(req, res, next) {
        if (req.originalUrl.match(/^\/api/) && req.method !== 'GET') {
            // path가 /api로 시작되고 method가 get이 아니라면 token인증
            
            if (
                req.session.passport
                && req.session.passport.user
                && req.session.passport.user.emails)
            {
                next();
            } else {
                res.status(403).send({
                    message: '권한이 없습니다.'
                });
            }
        } else {
            // 아니라면 진행
            next();
        }
    });

    fileApi(app);
    noticeApi(app);
    recruitApi(app);
    peopleApi(app);
    authApi(app);

    app.get('/api/s3test', (req, res) => {
        const bucket = req.query.bucket ? req.query.bucket : 'test-aws-sdk-kkb';
        const key = req.query.key;

        if (!key) {
            res.status(400).send('파일명은 필수입니다.');
        }

        utils.getDataFromS3(bucket, key, function(err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                res.status(400).send(err);
            } else {
                console.log(data);           // successful response
                res.status(200).send(data.Body);
            }
        });
    });

    app.get('/api/s3uploadtest', (req, res) => {
        utils.uploadDataToS3("test-aws-sdk-kkb", "test.json", {
            name: "TEST",
            age: 150
        }, function(err, data) {
            if (err){
                //console.log(err, err.stack); // an error occurred
                res.status(400).send(err);
            } else {
                //console.log(data);           // successful response
                res.status(200).send(data);
            }
        });
    });

    app.get('/api/s3list', (req, res) => {
        var params = {
            Bucket: 'test-aws-sdk-kkb',
            Delimiter: '/'
        };
           
        utils.AWS_OBJECT.S3.listObjects(params, (err, data) => {
            if(err) {
                res.send(err);
                throw err;
            }

            res.send(data);
        });
    });

    // app.get('/api/recruitFile', (req, res) => {
    //     const resultData = utils.getJson(utils.APP_PATH + '/testfile/recruit-list.json');

    //     resultData.data.list.map((obj, index) => {
    //         if (obj.date) {
    //             obj.create_datetime = new Date(obj.date).toLocaleString('ko-KR', {
    //                 timeZone: 'Asia/Seoul'
    //             });
    //         }
    //     });

    //     utils.writeJson('/testfile/recruit-list.json', resultData);

    //     res.status(200).send('success');
    // });

    // app.get('/api/noticeFile', (req, res) => {
    //     const resultData = utils.getJson(utils.APP_PATH + '/testfile/notice-list.json');

    //     resultData.data.list.map((obj, index) => {
    //         if (obj.date) {
    //             obj.create_datetime = new Date(obj.date).toLocaleString('ko-KR', {
    //                 timeZone: 'Asia/Seoul'
    //             });
    //         }
    //     });

    //     utils.writeJson('/testfile/notice-list.json', resultData);

    //     res.status(200).send('success');
    // });
}