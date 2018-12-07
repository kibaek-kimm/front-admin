var utils = require('./utils');

module.exports = function(app){
    var peopleData;
    
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
    app.get(`/api/people`, function(req, res, next){
        if (!peopleData) {
            peopleData = utils.getJson(utils.APP_PATH + '/testfile/team-list.json');
        }

        var offset = req.query.offset ? req.query.offset : 0;
        var limit = req.query.limit ? req.query.limit : 10;

        return res.send({
            list: peopleData.data.list.slice(offset, Number(offset) + Number(limit)),
            total_length: peopleData.data.list.length
        });
    });

    /**
     * 채용 상세 조회
     * 
     * TODO: 
     *      - content 문자열로 수정
     */
    app.get(`/api/people/:id`, function(req, res, next){
        if (!peopleData) {
            peopleData = utils.getJson(utils.APP_PATH + '/testfile/team-list.json');
        }

        var resultData = utils.getDataByKey(peopleData.data.list, 'id', req.params.id);

        if (resultData && resultData.data) {
            return res.send(resultData.data);
        } else {
            return res.status(400).send({
                error: 1,
                message: `id: ${req.params.id}에 해당되는 데이터가 없습니다.`
            });
        }
    });

    app.put(`/api/people/:id`, (req, res) => {
        var resultData = utils.getDataByKey(peopleData.data.list, 'id', req.params.id);

        if (resultData) {
            var objData = resultData.data;
            var index = resultData.index;

            objData.name = req.body.name;
            objData.title = req.body.title;
            objData.part = req.body.part;
            objData.department = req.body.department;
            objData.position = req.body.position;
            objData.desc = req.body.desc;
            objData.modified_datetime = new Date().toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul'
            });

            var newData = Object.assign(peopleData.data.list[index], objData);
            peopleData.data.list[index] = newData;

            utils.writeJson('/testfile/team-list.json', peopleData);

            res.status(200).send({
               error: 0,
               message: '정상적으로 수정 되었습니다,' 
            });
        } else {
            res.status(400).send({
                error: 1,
                message: `id: ${req.params.id}에 해당되는 데이터가 없습니다.`
            })
        }
    });
};