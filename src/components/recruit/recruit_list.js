import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

import { changeLoadingStatus } from '../../actions'
import List from '../common/board/list'


class RecruitList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            jsonData: null
        };

        // this.handleChangePage = this.handleChangePage.bind(this);
    }

    getArticle(_this) {
        axios.get(`/api/recruit?limit=${_this.state.listLimit}&offset=${_this.state.listOffset}`)
        .then(_response => {
            console.log('data : ',_response);
            _this.props.changeLoadingStatus(false);
            _this.setState({
                jsonData: _response.data.list,
                totalLength: _response.data.total_length
            });
        })
        .catch(e => {
            console.log('error : ',e);
        });
    }
    
    render() {
        const columns = [
            {
                dataField: 'id',
                text: 'ID'
            },{
                dataField: 'type',
                text: '상태'
            },{
                dataField: 'title',
                text: '제목',
                setColumn: (obj) => (<Link to={`/board/recruit/${obj.id}`}>{obj.title}</Link>)
            },{
                dataField: 'create_datetime',
                text: '생성날짜',
                setColumn: (obj) => obj.create_datetime ? new Date(obj.create_datetime).generateDate() : '-'
                
            },{
                dataField: 'modified_datetime',
                text: '수정날짜',
                setColumn: (obj) => obj.modified_datetime ? new Date(obj.modified_datetime).generateDate() : '-'
            }
        ];

        return (
            <React.Fragment>
                <List 
                    keyField="id"
                    title="채용공고 관리"
                    description="채용공고 정보를 관리하는 페이지입니다."
                    getData={this.getArticle}
                    columns={columns}
                    data={this.state.jsonData}
                    publicPath="/board/recruit/"
                />
            </React.Fragment>
        )
    }
}

export default RecruitList