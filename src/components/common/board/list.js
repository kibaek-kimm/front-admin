import React, { Component } from 'react';
import { connect } from 'react-redux'
import queryString from 'query-string'
import _ from 'lodash';

import { changeLoadingStatus } from '../../../actions/index'
import Pager from '../pager'

class List extends Component {
    constructor(props) {
        super(props);

        const queryStr = queryString.parse(window.location.search);
        const currentPage = queryStr.page ? queryStr.page : 1;
        const listLimit = 15;
        const listOffset = (currentPage - 1) * listLimit; 

        this.state = {
            jsonData: null,
            queryStr,
            currentPage,
            listLimit,
            listOffset
        }

        console.log(1111111111111)
    }

    componentDidMount() {
        this.props.changeLoadingStatus(true);

        console.log(11111);
        console.log(this.props.getData);

        if (this.props.getData) {
            this.props.getData(this);
        }
    }

    handleChangePage(newPage) {
        this.setState({
            currentPage: newPage,
            listOffset: (newPage - 1) * 15
        });

        console.log(newPage);
        console.log(this.state.listOffset);

        setTimeout(() => {
            this.props.getData(this);
        }, 100);
    }

    render() {
        setTimeout(() => {
            this.props.changeLoadingStatus(false);
        });
        console.log(this.props);

        const columns = this.props.columns;
        const data = this.state.jsonData;
        const validKeys = columns.map(obj => obj.dataField);

        /**
         * columns에 정의 된 요소중 setColumn이 존재하는지 체크한다.
         * 
         * @param {*} _targetObj 
         * @param {*} _targetKey 
         */
        const getColumn = (_targetObj, _targetKey) => {
            /**
             * FIXME: 아래로직 설명
             */
            const columnObj = _.filter(columns, obj => obj['dataField'] === _targetKey);

            if (columnObj) {
                if (columnObj[0].setColumn) {
                    return columnObj[0].setColumn(_targetObj);
                } else {
                    return _targetObj[_targetKey];
                }
            } else {
                return '';
            }
        };

        return (

            <React.Fragment>
                {!this.state.jsonData ? (
                    <div>
                        로딩중..
                        <p>{this.state.jsonData}</p>
                    </div>
                ) : (

                    <div className="article-list card">
                        <div className="header">
                            <h4 className="title">{this.props.title}</h4>
                            <p className="category">{this.props.description}</p>
                        </div>
                        {/* <BootstrapTable 
                            keyField={this.props.keyField}
                            wrapperClasses="table table-hover table-striped"
                            columns={this.props.columns}
                            data={this.props.data}
                            bordered={ false }
                        /> */}

                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    {columns.map((obj, index) => {
                                        return (
                                            <th key={'thead-' + encodeURI(obj.text + '' + obj.index)}>{obj.text}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                    {data.map((obj, index) => {
                                        return (
                                            <tr key={`tr-${index}+ ${encodeURI(obj[this.props.keyField])}`}>
                                                {validKeys.map((objKey, itemIndex) => {
                                                    return (
                                                        <td key={'td-' + encodeURI(obj.text + '' + obj.index + '' + itemIndex)}>{getColumn(obj, objKey)}</td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>

                        <Pager 
                            publicPath={this.props.publicPath}
                            pageQueryKey="page"
                            totalLength={this.state.totalLength}
                            viewSize={15}
                            currentPage={this.state.currentPage}
                            handleChangePage={this.handleChangePage}
                        />
                        
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoadingStatus: (_value) => dispatch(changeLoadingStatus(_value))
    }
}

export default connect(null, mapDispatchToProps)(List);