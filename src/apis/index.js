var path = require('path');
var fs = require('fs');
var utils = require('./utils');

/**
 * API Modules import
 */
var fileApi = require('./file_api');
var noticeApi = require('./notice_api');
var recruitApi = require('./recruit_api');
var peopleApi = require('./people_api');
var authApi = require('./auth_api');

module.exports = function(app){
    fileApi(app);
    noticeApi(app);
    recruitApi(app);
    peopleApi(app);
    authApi(app);

    app.get('/api/s3test', (req, res) => {

        utils.getDataFromS3("pfhomepagefilestest/files/main", "test.json", function(err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                res.status(400).send(err);
            } else {
                console.log(data);           // successful response   
                res.status(200).send(data.Body);
            }
        });

        // s3.getObject(params, function(err, data) {
        //     if (_callback && typeof _callback === 'function') {
        //         _callback.call(this, err, data);
        //     }
        // });
        
    });

    app.get('/api/s3uploadtest', (req, res) => {
        utils.uploadDataToS3("pfhomepagefilestest/files/main", "test.json", {
            name: "KIBAEK",
            age: 100
        }, function(err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                res.status(400).send(err);
            } else {
                console.log(data);           // successful response   
                res.status(200).send(data.Body);
            }
        });
    });

    app.get('/api/s3list', (req, res) => {
        var params = { 
            Bucket: 'pfhomepagefiles',
            Delimiter: '/'
        };
           
        utils.AWS_OBJECT.S3.listObjects(params, (err, data) => {

            if(err) {
                res.send(err);
                throw err;
            } 

            res.send(data);
            console.log(data);
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