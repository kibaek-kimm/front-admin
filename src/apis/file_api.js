var path = require('path');
var fs = require('fs');
var utils = require('./utils');
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

}