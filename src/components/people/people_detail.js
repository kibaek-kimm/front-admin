import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeLoadingStatus } from '../../actions'

class PeopleDetail extends Component {
    constructor(props) {
        super(props);

        this.handleInputTitle = this.handleInputTitle.bind(this);
        this.handleSubmitData = this.handleSubmitData.bind(this);

        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPosition = this.handleInputPosition.bind(this);
        this.handleInputDepartment = this.handleInputDepartment.bind(this);
        this.handleInputPart = this.handleInputPart.bind(this);
        this.handleInputDesc = this.handleInputDesc.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.id) {
            fetch(`/api/people/${this.props.match.params.id}`, {
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

    handleInputName(e) {
        var newObj = Object.assign(this.state.jsonData, {name: e.currentTarget.value});

        this.setState({
            jsonData: newObj
        });
    }

    handleInputDepartment(e) {
        var newObj = Object.assign(this.state.jsonData, {department: e.currentTarget.value});

        this.setState({
            jsonData: newObj
        });
    }

    handleInputPart(e) {
        var newObj = Object.assign(this.state.jsonData, {part: e.currentTarget.value});

        this.setState({
            jsonData: newObj
        });
    }

    handleInputPosition(e) {
        var newObj = Object.assign(this.state.jsonData, {position: e.currentTarget.value});

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

    handleInputDesc(e) {
        var newObj = Object.assign(this.state.jsonData, {desc: e.currentTarget.value});

        this.setState({
            jsonData: newObj
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(111);

        this.handleSubmitData(e);
    }

    handleSubmitData(e) {
        if (!this.state.jsonData.title) {
            alert('제목은 필수입니다.');
            return false;
        }

        if (!this.state.jsonData.desc) {
            alert('설명은 필수입니다.');
            return false;
        }

        var options = {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.jsonData.name,
                title: this.state.jsonData.title,
                department: this.state.jsonData.department,
                position: this.state.jsonData.position,
                part: this.state.jsonData.part,
                desc: this.state.jsonData.desc
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
            fetch(`/api/people/${this.state.jsonData.id}`, options)
            .then(_response => _response.json())
            .then(_data => {
                if (_data.error) {
                    console.log(_data.message);
                    console.log(_data);
                    if (_data.status == 403) {
                        window.location = `/login/?r=${window.location.pathname + window.location.search}`
                    }
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

    render() {

        const renderContent = () => {
            if (!this.state || !this.state.jsonData) {
                return (
                    <div>로딩중</div>
                )
            } else {
                return (
                    <form
                        className="border border-light p-4"
                        action="javascript:void(0)"
                        onSubmit={this.handleSubmit}
                    >
                        <h3>피플펀드사람들 관리</h3>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_name">이름</label>
                            <input id="article_name" name="article_name" type="text" placeholder="Name" className="form-control input-md col-md-4" value={this.state.jsonData.name} onChange={this.handleInputName}/>
                            <label className="col-md-2 control-label">ID</label>
                            <div className="col-md-4">{this.state.jsonData.id}</div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_title">생성날짜</label>
                            <div className="col-md-2">{this.state.jsonData.create_datetime ? new Date(this.state.jsonData.create_datetime).generateDate() : '-'}</div>
                            <label className="col-md-2 control-label" htmlFor="article_title">마지막 수정날짜</label>
                            <div className="col-md-2">{this.state.jsonData.modified_datetime ? new Date(this.state.jsonData.modified_datetime).generateDate() : '-'}</div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_position">포지션</label>
                            <div className="col-md-4">
                                <input id="article_position" name="article_position" type="text" placeholder="Position" className="form-control input-md" value={this.state.jsonData.position} onChange={this.handleInputPosition}/>
                            </div>
                            <label className="col-md-2 control-label" htmlFor="article_part">파트</label>
                            <div className="col-md-4">
                                <input id="article_part" name="article_part" type="text" placeholder="Part" className="form-control input-md" value={this.state.jsonData.part} onChange={this.handleInputPart}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_title">제목</label>
                            <div className="col-md-10">
                                <input id="article_title" name="article_title" type="text" placeholder="글 제목" className="form-control input-md" value={this.state.jsonData.title} onChange={this.handleInputTitle}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-2 control-label" htmlFor="article_desc">설명</label>
                            <div className="col-md-10">
                                <textarea className="form-control" height="200" rows="5" id="article_desc" name="article_desc" value={this.state.jsonData.desc} onChange={this.handleInputDesc}></textarea>
                            </div>
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

export default connect(null, mapDispatchToProps)(PeopleDetail);