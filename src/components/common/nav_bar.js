import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser, unsetUser, changeLoadingStatus } from '../../actions';



class NavBar extends Component {
    componentDidMount() {
        this.props.setUser();
    }

    handleLogin() {
        this.props.changeLoadingStatus(true);
        setTimeout(() => {
            window.location.href = `/auth/google/?r=${window.location.pathname}${window.location.search}`;
        }, 500);
    }

    handleLogout() {
        this.props.changeLoadingStatus(true);
        
        
        setTimeout(() => {
            this.props.unsetUser();
            this.props.changeLoadingStatus(false);
        }, 500);
    }

    render() {
        console.log('====');
        console.log('nav_bar : ');
        console.log(this.props.user);
        const globalWindow = window;
        
        return (
            <nav className="navbar navbar-default navbar-fixed">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Dashboard</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            {this.props.user ? (
                                <li>
                                    <a href="javascript:;" onClick={() => this.handleLogout()}><p>로그아웃</p></a>
                                </li>
                            ) : (
                                <li>
                                    <a href="javascript:;" onClick={() => this.handleLogin()}><p>로그인</p></a>
                                </li>
                            )}
                            
                            <li className="separator hidden-lg"></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoding: state.isLoding
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: () => dispatch(setUser()),
        unsetUser: () => dispatch(unsetUser()),
        changeLoadingStatus: (_value) => dispatch(changeLoadingStatus(_value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);