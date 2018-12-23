import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeLoadingStatus } from '../../actions'

import TinyMCE from 'react-tinymce';

class RecruitDetail extends Component {
    constructor(props) {
        super(props);

        this.handleRadioType = this.handleRadioType.bind(this);
        this.handleInputTitle = this.handleInputTitle.bind(this);
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params && this.props.match.params.id) {
            fetch(`/api/recruit/${this.props.match.params.id}`, {
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
                    jsonData: _data
                });
            })
            .catch(e => {
                console.log('error : ',e);
            });
        }
    }

    handleEditorChange(e) {
        var newObj = Object.assign(this.state.jsonData, {
            contents: e.target.getContent()
        });

        this.setState({
            jsonData: newObj
        });
    }

    handleInputTitle(e) {
        var newObj = Object.assign(this.state.jsonData, {title: e.currentTarget.value});

        this.setState({
            jsonData: newObj
        });
    }

    handleSubmitData(e) {
        if (!this.state.jsonData.title) {
            alert('제목은 필수입니다.');
            return false;
        }

        if (!this.state.jsonData.contents) {
            alert('내용은 필수입니다.');
            return false;
        }

        

        var options = {
            method: 'PUT',
            body: JSON.stringify({
                title: this.state.jsonData.title,
                contents: this.state.jsonData.contents,
                type: this.state.jsonData.type
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        this.props.changeLoadingStatus(true);

        setTimeout(() => {
            this.props.changeLoadingStatus(false);
        }, 500);

        setTimeout(() => {
            fetch(`/api/recruit/${this.state.jsonData.id}`, options)
            .then(_response => _response.json())
            .then(_data => {
                if (_data.error) {
                    console.log(_data.message);
                } else {
                    window.history.back();
                }
            })
            .catch(err => {
                this.props.changeLoadingStatus(false);
                console.log('Error, with message:', err.statusText)
            });
        }, 1000);
    }

    handleRadioType(e) {
        var newObj;

        if (e.currentTarget.value === 'ing') {
            newObj = Object.assign(this.state.jsonData, {type: 'ing'});
        } else {
            newObj = Object.assign(this.state.jsonData, {type: 'end'});
        }

        this.setState({
            jsonData: newObj
        });
    }

    render() {

        const renderContent = () => {
            if (!this.state || !this.state.jsonData) {
                return (
                    <div>로딩중</div>
                )
            } else {
                return (
                    <form className="border border-light p-4">
                        <h3>채용공고 관리</h3>
                        <div className="form-group">
                            <label className="col-md-2 control-label">ID</label>  
                            <div className="col-md-10">{this.state.jsonData.id}</div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_title">생성날짜</label>  
                            <div className="col-md-2">{this.state.jsonData.create_datetime ? new Date(this.state.jsonData.create_datetime).generateDate() : '-'}</div>
                            <label className="col-md-2 control-label" htmlFor="article_title">마지막 수정날짜</label>  
                            <div className="col-md-2">{this.state.jsonData.modified_datetime ? new Date(this.state.jsonData.modified_datetime).generateDate() : '-'}</div>
                            <label className="col-sm-2 control-label" htmlFor="article_title">채용공고 상태</label>  
                            <div className="col-sm-2">
                                <span className="col-sm-6">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="notice_type" id="notice_type1" value="ing" checked={this.state.jsonData.type === 'ing' ? true : false} onChange={this.handleRadioType}/>
                                        진행중
                                    </label>
                                </span>
                                <span className="col-sm-6">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="notice_type" id="notice_type2" value="end" checked={this.state.jsonData.type === 'end' ? true : false} onChange={this.handleRadioType} />
                                        종료
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_title">제목</label>  
                            <div className="col-md-10">
                                <input id="article_title" name="article_title" type="text" placeholder="글 제목" className="form-control input-md" value={this.state.jsonData.title} onChange={this.handleInputTitle}/>
                            </div>
                        </div>

                        <div className="form-group" style={{display : 'block'}}>
                            <TinyMCE
                                content={typeof this.state.jsonData.contents === 'string' ? this.state.jsonData.contents : '내용을 입력하세요.'}
                                config={{
                                    height: '480px',
                                    plugins: 'autolink link image lists print preview table lists',
                                    toolbar: 'undo redo | style-h1 style-h2 style-h3 link bold | alignleft aligncenter alignright | numlist bullist | table',
                                    selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink'
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </div>

                        <div className="form-group" style={{display : 'block'}}>
                            <div className="btn-area">
                                <a className="btn btn-primary" onClick={this.handleSubmitData}>저장</a>
                            </div>
                        </div>
                    </form>
                );
            }
        };

        return (
            <div className="article-detail">
                {renderContent()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeLoadingStatus}, dispatch);
}

export default connect(null, mapDispatchToProps)(RecruitDetail);