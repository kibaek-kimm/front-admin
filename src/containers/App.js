import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from '../actions'

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

class App extends React.Component{
    componentDidMount() {
        fetch('/api/auth', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(_response => _response.json())
        .then(_data => {
            console.log(_data)
            if (_data.status !== 200) {
                window.location = `/login/?r=${window.location.pathname + window.location.search}`
            } else {
                this.props.setUser(_data);
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(App);