import React, { Component } from 'react';

class Auth extends Component {
    componentWillAmount() {
        /**
         * jwt 유효성 체크
         * 
         * if '/' 로 보냄
         * else 렌더링 
         * 
         */
    }

    render() {
        return (
            <div className="login-form">
                <p><strong>피플펀드</strong> 계정으로 인증해주세요.</p>
                <div className="btn-area">
                    <a href="javascript:;" className="btn btn-primary">인증하기</a>
                </div>
            </div>
        );
    }
}

export default Auth;