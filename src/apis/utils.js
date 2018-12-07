var path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');

console.log(process.env.DIRNAME);
var appPath = path.join(process.env.DIRNAME, 'public');
var s3 = new AWS.S3();


module.exports = {
    APP_PATH: appPath,
    AWS_OBJECT: {
        AWS: AWS,
        S3: s3
    },
    getDataFromS3: function(_bucket, _fileName, _callback) {
        if (!_bucket) {
            new Error('ERROR: Bucket명은 필수 입니다.');
            return false;
        }

        if (!_fileName) {
            new Error('ERROR: 파일명은 필수 입니다.');
            return false;
        }

        var params = {
            Bucket: _bucket, 
            Key: _fileName
        };
        
        s3.getObject(params, function(err, data) {
            if (_callback && typeof _callback === 'function') {
                _callback.call(this, err, data);
            }
        });
    },
    uploadDataToS3: function(_bucket, _fileName, _data, _callback) {
        console.log('BUFFER ::: ',Buffer.from(JSON.stringify(_data)));
        var params = {
            Bucket: _bucket, 
            Key: _fileName, 
            ACL: 'public-read',
            ContentEncoding: 'application/json',
            Body: Buffer.from(JSON.stringify(_data))
        };
        var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
        s3.upload(params, options, function(err, data) {
            console.log(err, data);
            if (_callback && typeof _callback === 'function') {
                _callback.call(this, err, data);
            }
        });
    },
    getJson: function(_filePath) {
        if (!_filePath) {
            return false;
        }
        
        try {
            var resultData = fs.readFileSync(_filePath);
        } catch (e) {
            console.log(e);
        }
        
        return JSON.parse(resultData);
    },
    writeJson: function(_path, _data) {
        fs.writeFileSync(appPath + _path, JSON.stringify(_data, null, 4), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });
    },
    getDataByKey: function(_data, _key, _value) {
        if (!_data || !Array.isArray(_data)) {
            console.log('ERROR: _data는 무조건 Array 타입이여야 합니다.');
            return false;
        }

        if (!_key) {
            console.log('ERROR: key는 필수값입니다.');
            return false;
        }

        console.log(_value);

        if (!_value) {
            console.log('ERROR: value는 필수값입니다.');
            return false;
        }

        var i = 0;
        for (; i < _data.length; i++) {
            if (_data[i][_key] === _value) {
                return {
                    index: i,
                    data: _data[i]
                };
            }
        }

        return null;
    }
}