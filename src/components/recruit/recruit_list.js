import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeLoadingStatus } from '../../actions'

import Pager from '../common/pager'


class RecruitList extends React.Component{
    constructor(props) {
        super(props);

        const queryStr = queryString.parse(this.props.location.search);
        const currentPage = queryStr.page ? queryStr.page : 1;
        const listLimit = 15;
        const listOffset = (currentPage - 1) * listLimit; 

        this.state = {
            isLoading: true,
            jsonData: null,
            currentPage: currentPage,
            listLimit: listLimit,
            listOffset: listOffset
        };

        this.handleChangePage = this.handleChangePage.bind(this);
    }
    
    componentWillMount() {
        this.props.changeLoadingStatus(true);
        this.getArticle();
    }

    getArticle() {
        console.log(`/api/recruit?limit=${this.state.listLimit}&offset=${this.state.listOffset}`);
        
        fetch(`/api/recruit?limit=${this.state.listLimit}&offset=${this.state.listOffset}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(_response => _response.json())
        .then(_data => {
            console.log('data : ',_data);
            this.setState({
                jsonData: _data.list,
                totalLength: _data.total_length
            });
            this.props.changeLoadingStatus(false);
        })
        .catch(e => {
            console.log('error : ',e);
        });
    }

    handleChangePage(newPage) {
        this.setState({
            currentPage: newPage,
            listOffset: (newPage - 1) * 15
        });

        console.log(newPage);
        console.log(this.state.listOffset);

        setTimeout(() => {
            this.getArticle();
        }, 100);
    }
    
    render() {
        const renderContent = () => {
            if (!this.state || !this.state.jsonData) {
                return <div>로딩중</div>;
            } else {
                return (
                    <div className="article-list">
                        <h3>채용공고 관리</h3>
                        <table id="mytable" className="table table-bordred table-striped">   
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>상태</th>
                                    <th>제목</th>
                                    <th>생성날짜</th>
                                    <th>수정날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.jsonData.map((obj, index) => {
                                    return (
                                        <tr key={'nl-' + index}>
                                            <td>{obj.id}</td>
                                            <th>{obj.type === 'ing' ? '진행중' : '종료'}</th>
                                            <td>
                                                <Link to={`/board/recruit/${obj.id}`}>{obj.title}</Link>
                                            </td>
                                            <td style={{fontSize: '13px'}}>{obj.create_datetime ? new Date(obj.create_datetime).generateDate() : '-'}</td>
                                            <td style={{fontSize: '13px'}}>{obj.modified_datetime ? new Date(obj.modified_datetime).generateDate() : '-'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
    
                        <Pager 
                            publicPath="/board/recruit/?page="
                            totalLength={this.state.totalLength}
                            viewSize={15}
                            currentPage={this.state.currentPage}
                            handleChangePage={this.handleChangePage}
                        />
                    </div>
                )
            }            
        };

        return (
            <React.Fragment>
                <h2>{this.props.title}</h2>
                {renderContent()}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeLoadingStatus}, dispatch);
}

export default connect(null, mapDispatchToProps)(RecruitList);