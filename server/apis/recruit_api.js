var utils = require('../utils');

module.exports = function(app){
    var recruitData;
    
    /**
     * 채용 리스트 조회
     * query 
     *      - offset
     *      - limit
     * 
     * TODO: 
     *      - content 문자열로 수정
     *      - create_datetime, modified_datetime
     *      - 추후 프론트 공지사항 타입 + 날짜 기준으로 정렬
     */
    app.get(`/api/recruit`, function(req, res, next){
        var offset = req.query.offset ? req.query.offset : 0;
        var limit = req.query.limit ? req.query.limit : 10;

        if (!recruitData) {
            utils.getDataFromS3('test-aws-sdk-kkb', 'recruit-list.json', data => {
                recruitData = JSON.parse(data.Body);

                return res.send({
                    list: recruitData.data.list.slice(offset, Number(offset) + Number(limit)),
                    total_length: recruitData.data.list.length
                });
            });
        } else {
            return res.send({
                list: recruitData.data.list.slice(offset, Number(offset) + Number(limit)),
                total_length: recruitData.data.list.length
            });
        }
    });

    /**
     * 채용 상세 조회
     * 
     * TODO: 
     *      - content 문자열로 수정
     */
    app.get(`/api/recruit/:id`, function(req, res, next){
        if (!recruitData) {
            utils.getDataFromS3('test-aws-sdk-kkb', 'recruit-list.json', data => {
                recruitData = JSON.parse(data.Body);

                var resultData = utils.getDataByKey(recruitData.data.list, 'id', Number(req.params.id));

                if (resultData && resultData.data) {
                    return res.send(resultData.data);
                } else {
                    return res.status(400).send({
                        error: 1,
                        message: `id: ${req.params.id}에 해당되는 데이터가 없습니다.`
                    });
                }            
            });
        } else {
            var resultData = utils.getDataByKey(recruitData.data.list, 'id', Number(req.params.id));

            if (resultData && resultData.data) {
                return res.send(resultData.data);
            } else {
                return res.status(400).send({
                    error: 1,
                    message: `id: ${req.params.id}에 해당되는 데이터가 없습니다.`
                });
            }
        }
    });

    app.put(`/api/recruit/:id`, (req, res) => {
        var resultData = utils.getDataByKey(recruitData.data.list, 'id', Number(req.params.id));

        if (resultData) {
            var objData = resultData.data;
            var index = resultData.index;

            objData.title = req.body.title;
            objData.contents = req.body.contents;
            objData.type = req.body.type;
            objData.modified_datetime = new Date().toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul'
            });

            var newData = Object.assign(recruitData.data.list[index], objData);
            recruitData.data.list[index] = newData;

            console.log(recruitData);
            

            utils.uploadDataToS3('test-aws-sdk-kkb', 'recruit-list.json', recruitData, data => {
                res.status(200).send({
                    error: 0,
                    message: '정상적으로 수정 되었습니다.' 
                 });
            });
        } else {
            res.status(400).send({
                error: 1,
                message: `id: ${req.params.id}에 해당되는 데이터가 없습니다.`
            })
        }
    });
};