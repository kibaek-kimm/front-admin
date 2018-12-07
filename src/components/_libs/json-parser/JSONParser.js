import React from 'react'

const renderData = [];
const isIterable = (_data) => {
    return !(typeof _data === 'string' || typeof _data === 'number' || typeof _data === 'boolean');
};

const typeOf = (_data) => {
    if (typeof _data === 'string' || typeof _data === 'number' || typeof _data === 'boolean') {
        return typeof _data;
    } else {
        return Array.isArray(_data) ? 'array' : 'object';
    }
};

const ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

const generateJson = ({id, key, value, type, depth, parent_node_id}) => {
        
};

/**
 * 배열/객체를 분해한다.
 * 재귀함수 형태로 계속해서 분해 후, renderData 안에 정해진 포맷으로 요소가 추가된다.
 * 
 * @param {*} _data 
 */
const setData = (_data, _depth, _parentNodeId) => {
    if (_data === undefined) {
        return false;
    }

    var depth = _depth ? _depth : 0;
    var parentNodeId = _parentNodeId ? _parentNodeId : null;
    

    for (var key in _data) {
        let pk = ID();

        renderData.push({
            id: pk,
            depth,
            key,
            value: _data[key],
            type: typeOf(_data[key]),
            parent_node_id: parentNodeId
        });

        if (isIterable(_data[key])) {
            // return;
            setData(_data[key], ++depth , pk);
        }
    }


    /*
        * Object 분해
        * 연결고리 끝나는 지점 인지
        * 
    */
};

/*
    ** Pure Json **
    {
        "key1": 1:
        "key2": "str",
        "key3": [
            1,
            "str"
        ],
        "key4": {
            "key4_1": 1,
            "key4_2": "2"
        }
    }
    
    ** Compiled Json **
    [
        {
            id: Primary key,
            key: "key1",
            value: 1,
            type: 'number',
            depth: 1,
            parent_node: '' or null
        },
        {
            id: Primary key,
            key: "key2",
            value: "str",
            type: 'string',
            depth: 1,
            parent_node: '' or null
        }
        {
            id: Primary key,
            key: "key3",
            value: null,
            type: 'array',
            depth: 1,
            parent_node: '' or null
        }
        {
            id: Primary key,
            key: "0" or 0,
            value: 1,
            type: 'number',
            depth: 2,
            parent_node: key3의 Primary key
        }
        {
            id: Primary key,
            key: "1" or 1,
            value: "str",
            type: 'string',
            depth: 2,
            parent_node: key3의 Primary key
        }
    ]
*/

class JSONParser extends React.Component{
    constructor(props) {
        /*
            entry_data
            s3_info
            save()
            getJsx()
                : data를 JSX로 반환
        */
        super(props);
        this.state = {
            jsonData: this.props.jsonData
        };

        console.log('setData : ');
        setData(this.state.jsonData);
        console.log(renderData);
    }
    
    getRow() {
        
    }
    
    /*
    const parseRow = (_data) => {
        if (!isIterable(_data)) {
            return _data;
        }
        
        let dataType = typeOf(_data),
            str = '<ul>';
            
            
        console.log(_data);
        
        for (let key in _data) {
            
            let value = _data[key];
            str += `
                <li>
                    ${dataType === 'array' ? '' : `<span class="key">${key} <i>(${typeOf(value)})</i></span>`}
                    ${isIterable(value) ? parseRow(value) : value}
                </li>
            `;
        }
        
        str += '</ul>';
        return str;
    };
    
    */
    
    save() {
        
    }
    
    render() {
        const parseRow = (_data) => {
            if (!isIterable(_data)) {
                return _data;
            }
            
            let dataType = typeOf(_data),
                result = [];
            
            for (let key in _data) {
                
                //let value = _data[key];
                // result += `
                //     <li>
                //         ${dataType === 'array' ? '' : `<span class="key">${key} <i>(${typeOf(value)})</i></span>`}
                //         ${isIterable(value) ? parseRow(value) : value}
                //     </li>
                // `;
                result.push((
                    <div className="form-group">
                        <label>{key}</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            onChange={(e) => {this.setState({jsonData: {lastId: e.currentTarget.value}})}}
                        >
                            {_data[key]}
                        </textarea>
                    </div>
                ));
            }
            
            console.log(result);
            
            return result;
        };
        
        //console.log();
        
        setTimeout(() => {
            console.log(this.state.jsonData);
        }, 5000);
        
        return (
            <div>{parseRow(this.state.jsonData)}</div>
        )
    }
}

export default JSONParser;