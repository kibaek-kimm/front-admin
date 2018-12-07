import React from 'react'

class ShowcaseDetail extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentDetailIndex: 0,
            expertInfo : {
                jwkwak: {
                    name: '곽정우ㅣ부동산2팀 팀장',
                    value: '前 현대증권 부동산금융부, 대림산업 근무',
                    url: 'jwkwak.png'
                },
                heejae: {
                    name: '이희재ㅣ부동산 사업1팀장',
                    value: '前 대신F&I 근무',
                    url: 'heejae.png'
                },
                wonkun: {
                    name: '유원근ㅣ개인신용 총괄',
                    value: '前 KDB산업은행 / SC제일은행 근무',
                    url: 'wonkun.png'
                },
                minju: {
                    name: '박민주ㅣ변호사',
                    value: '前 국민연금공단 준법지원실(기금운용 분야) / 법무법인 충정 근무',
                    url: 'minju.png'
                }
            }
        }
    }

    componentWillMount() {
        fetch('/testfile/sr399.json', {
            method: 'get'
        })
        .then(_response => _response.json())
        .then(_json => {
            this.setState({
                jsonData: _json.data
            });
        });
    }

    handleSpecTitle(e, _index) {
        const newSpecArr = this.state.jsonData.spec;
        newSpecArr[_index].title = e.currentTarget.value;

        const newObj = Object.assign(this.state.jsonData, {
            spec: newSpecArr
        });

        this.setState({
            jsonData: newObj
        });
    }

    handleSpecValue(e, _index) {
        const newSpecArr = this.state.jsonData.spec;
        newSpecArr[_index].value = e.currentTarget.value;

        const newObj = Object.assign(this.state.jsonData, {
            spec: newSpecArr
        });

        this.setState({
            jsonData: newObj
        });
    }

    handleSummary(e) {
        const newObj = Object.assign(this.state.jsonData, {
            summary: {
                "cont": [
                    {
                        "text": [e.currentTarget.value]
                    }
                ]
            }
        });

        this.setState({
            jsonData: newObj
        });
    }

    handlePoints(e, _index) {
        const newArr = this.state.jsonData.point.list;
        newArr[_index] = e.currentTarget.value;

        const newObj = Object.assign(this.state.jsonData, {
            point: {
                list: newArr
            }
        });

        this.setState({
            jsonData: newObj
        }); 
    }

    handleExpertPerson(e, _index) {
        const tempObj = this.state.jsonData.expert;
        tempObj[_index].name = this.state.expertInfo[e.currentTarget.value].name;
        tempObj[_index].value = this.state.expertInfo[e.currentTarget.value].value;
        tempObj[_index].url = this.state.expertInfo[e.currentTarget.value].url;

        this.setState({
            jsonData: Object.assign(this.state.jsonData, {
                expert: tempObj
            })
        }); 
    }

    handleExpert(e, _index, _type) {
        const tempObj = this.state.jsonData.expert;

        if (_type === 'title') {
            tempObj[_index].title = e.currentTarget.value;
        } else {
            tempObj[_index].detail[0] = e.currentTarget.value;
        }

        this.setState({
            jsonData: Object.assign(this.state.jsonData, {
                expert: tempObj
            })
        }); 
    }

    handleDetailTab(e, _index) {
        this.setState({
            currentDetailIndex: _index
        }); 
    }

    handleProdList(e) {
        
    }
    
    render() {
        const renderContent = () => {
            if (!this.state || !this.state.jsonData) {
                return (
                    <div>로딩중</div>
                )
            } else {
                return (
                    <div className="article-detail">
                        <form className="border border-light p-4">
                            <h3>딜 정보 관리</h3>
                            <div className="group">
                                <h4>채권스펙</h4>
                                {this.state.jsonData.spec.map((obj, index) => {
                                    return (
                                        <div className="form-group" key={"spec-" + index}>
                                            <label className="col-md-1 control-label" htmlFor={"spec_name" + index}>이름</label>  
                                            <div className="col-md-4">
                                                <input type="text" className="form-control input-md" id={"spec_name" + index} value={obj.title} onChange={(e) => this.handleSpecTitle(e, index)}/>
                                            </div>
                                            <label className="col-md-1 control-label" htmlFor={"spec_value" + index}>값</label>  
                                            <div className="col-md-4">
                                                <input type="text" className="form-control input-md" id={"spec_value" + index} value={obj.value} onChange={(e) => this.handleSpecValue(e, index)}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="group">
                                <h4>한마디로 본채권은</h4>
                                <div className="col-md-12">
                                    <input type="text" className="form-control input-md" value={this.state.jsonData.summary.cont[0].text[0]} onChange={(e) => this.handleSummary(e)}/>
                                </div>
                            </div>

                            <div className="group">
                                <h4>투자 포인트</h4>
                                {this.state.jsonData.point.list.map((text, index) => {
                                    return (
                                        <div className="form-group" key={"point-" + index}>
                                            <div className="col-md-12">
                                                <label className="col-md-2 control-label" htmlFor={"point-" + index} style={{'paddingLeft':0}}>Point 0{index + 1}</label>  
                                                <input type="text" className="form-control input-md" id={"point-" + index} value={text} onChange={(e) => this.handlePoints(e, index)}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="group">
                                <h4>전문가 의견</h4>
                                {this.state.jsonData.expert.map((obj, index) => {
                                    return (
                                        <React.Fragment key={"expert-" + index}>
                                            <div className="form-group">
                                                <select 
                                                    className="form-control" 
                                                    id="exampleFormControlSelect1" 
                                                    onChange={(e) => this.handleExpertPerson(e, index)} 
                                                    value={obj.url.replace(/\.png/,'')}
                                                >
                                                    <option value="">--</option>
                                                    <option value="jwkwak">곽정우</option>
                                                    <option value="heejae">이희재</option>
                                                    <option value="wonkun">유원근</option>
                                                    <option value="minju">박민주</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control input-md" value={obj.name} disabled readOnly/>
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control input-md" value={obj.value} disabled readOnly/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12">
                                                    <label className="col-md-2 control-label" htmlFor="expert-title" style={{'paddingLeft':0}}>제목</label>  
                                                    <input type="text" className="form-control input-md" id="expert-title" value={obj.title} onChange={(e) => this.handleExpert(e, index, 'title')}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12">
                                                    <label className="col-md-2 control-label" htmlFor="expert-description" style={{'paddingLeft':0}}>설명</label>  
                                                    <textarea type="text" className="form-control input-md" id="expert-description" value={obj.detail[0]} onChange={(e) => this.handleExpert(e, index, 'detail')}></textarea>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <div className="group">
                                <h4>상세리포트 ({this.state.jsonData.detail[this.state.currentDetailIndex].title})</h4>
                                <ul className="nav nav-tabs">
                                {this.state.jsonData.detail.map((obj, index) => {
                                    return (
                                        <li className={this.state.currentDetailIndex === index ? 'active' : ''} onClick={(e) => this.handleDetailTab(e, index)}><a data-toggle="tab" href={'showcase-report-' + index}>{obj.title}</a></li>
                                    )
                                })}
                                </ul>
                                {renderReportContents(this.state.jsonData.detail[this.state.currentDetailIndex].title)}
                            </div>

                        </form>
                    </div>
                );
            }
        };

        const renderReportContents = (_categoryName) => {
            const detailJsx = [];

            switch(_categoryName) {
                case '상품상세':
                    const data = this.state.jsonData.detail.filter(obj => obj.title === _categoryName);
                    const imageBlock = data[0].section[0].cont.filter(obj => obj.type === 'img');
                    const listBlock = data[0].section[0].cont.filter(obj => obj.type === 'ul');
                    console.log(data);
                    console.log(listBlock[0].text);

                    detailJsx.push((
                        <div className="form-group">
                            <div className="col-md-12">
                                <label className="col-md-2 control-label" htmlFor="" style={{'paddingLeft':0}}>상품구조</label>  
                                <textarea className="form-control input-md" defaultValue={listBlock[0].text.join('\n')} onChange={e => this.handleProdList(e)}></textarea>
                            </div>
                        </div>
                    ));
                    break;
                case '상환계획':
                    break;
                case '리스크':
                    break;
                case '투자자 보호장치':
                    break;
                case '세부 정보':
                    break;
                default:
            }

            return (
                <div className="tab-content">
                    {this.state.jsonData.detail.map((obj, index) => (
                        <div className={this.state.currentDetailIndex === index ? 'tab-pane container active' : 'tab-pane container'} id={'showcase-report-' + index}>
                            {detailJsx}
                        </div>
                    ))}
                </div>
            );
        };

        return (
            <React.Fragment>
                {renderContent()}
            </React.Fragment>
        )
    }
}

export default ShowcaseDetail;