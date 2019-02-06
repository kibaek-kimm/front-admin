import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

/* 공통 컴퍼넌트 */
import SideMenu from './../components/common/slide_menu'
import Loading from './../components/common/loading'
import Auth from './../components/common/auth'

/* 딜관리 컴퍼넌트 */
import ShowcaseList from './../components/showcase/showcase_list'
import ShowcaseDetail from './../components/showcase/showcase_detail'
/* 채용관리 컴퍼넌트 */
import RecruitList from './../components/recruit/recruit_list';
import RecruitDetail from './../components/recruit/recruit_detail'
/* 공지사항관리 컴퍼넌트 */
import NoticeList from './../components/notice/notice_list'
import NoticeDetail from './../components/notice/notice_detail'
import Faq from '../components/faq/faq_list'
/* 피플펀드사람들 관리 컴퍼넌트 */
import PeopleList from './../components/people/people_list'
import PeopleDetail from './../components/people/people_detail'

/**
 * api 호출 시 token을 인증한다.
 * 
 * return Promise
 */
window.callApi = (_url, _obj, _shouldNotAuthen) => {
    if (!_url) {
        new Error('url값은 필수입니다.');
    }

    if (!_obj || !_obj.headers || !_obj.method) {
        new Error('api 통신을 위한 최소한의 object값은 필수입니다. (method, headers)');
    }

    if (!_shouldNotAuthen) {
        var storage = window['localStorage'];
        if (!storage.getItem('token')) {
            new Error('권한이 없습니다. 로그인 해주세요.');
        }

        _obj.headers = Object.assign(_obj.headers, {}, {
            'Authorization': `Bearer ${storage.getItem('token')}`
        });
    }

    return fetch(_url, _obj);
};

class App extends React.Component{
    componentDidMount() {
        var storage = window['localStorage'];

        if (storage.getItem('token')) { 
            console.log('token 이미 존재함');


            callApi('/api/verify_jwt', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token: storage.getItem('token'),
                })
            })
            .then(_response => _response.json())
            .then(_data => {
                console.log(111111);
                
                console.log(_data);
            })
            .catch(e => {
                console.log('error : ',e);
            });


            return;
        }

        callApi('/api/get_jwt', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(_response => _response.json())
        .then(_data => {
            if (_data.token) {
                storage.setItem('token', _data.token);
            } else {
                window.location = `/login/?r=${window.location.pathname + window.location.search}`
            }
        })
        .catch(e => {
            console.log('error : ',e);
        });

        
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Loading />
                    <SideMenu />
                    <div id="content">
                        <Route
                            path="/showcase/:id"
                            exact
                            component={ShowcaseDetail}
                            title="딜 관리"
                        />
                        <Route
                            path="/board/recruit"
                            exact
                            component={RecruitList}
                            title="채용"
                        />
                        <Route
                            path="/board/recruit/:id"
                            exact
                            component={RecruitDetail}
                            title="채용"
                        />
                        <Route
                            path="/board/notice"
                            exact
                            component={NoticeList}
                            title="공지사항"
                        />
                        <Route
                            path="/board/notice/:id"
                            exact
                            component={NoticeDetail}
                            title="공지사항"
                        />
                        <Route
                            path="/board/faq"
                            exact
                            component={Faq}
                            title="FAQ"
                        />
                        <Route
                            path="/board/people"
                            exact
                            component={PeopleList}
                            title="피플펀드 소개"
                        />
                        <Route
                            path="/board/people/:id"
                            exact
                            component={PeopleDetail}
                            title="피플펀드 소개"
                        />
                    </div>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App