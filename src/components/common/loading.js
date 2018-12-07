import React, { Component } from 'react';
import { connect } from 'react-redux'

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillReceiveProps() {
    //     console.log('%c componentWillReceiveProps: ','color:#fff;background:#aaa;');
    //     console.log('| ',this.props);
    //     console.log('| ',this.props.isLoading);
    //     console.log('%c componentWillReceiveProps END','color:#fff;background:#aaa;');
    // }

    render() {
        const renderContent = () => {
            // console.log('%c renderContent entry: ','color:#fff;background:#000;');
            // console.log('in loading render function ',this.props.isLoading);

            if (this.props.isLoading) {
                return (
                    <div className="loading-panel">
                        <div className="container">
                            <div className="dot dot-1"></div>
                            <div className="dot dot-2"></div>
                            <div className="dot dot-3"></div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                )
            } else {
                return <React.Fragment></React.Fragment>;
            }
        };

        return (
            <React.Fragment>
                {renderContent()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('%c mapStateToProps : ', 'color:#fff;background:#05850a');
    // console.log(state);
    // console.log(state.isLoading);
    // console.log('%c mapStateToProps END', 'color:#fff;background:#05850a');
    return {
        isLoading: state.isLoading
    };
};

export default connect(mapStateToProps)(Loading);