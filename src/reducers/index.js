import {CHANGE_CURRENT_MENU, CHANGE_LOADING_STATUS, SET_USER, UNSET_USER} from '../actions';
import { combineReducers } from 'redux';

const menuInitialState = {
    currentMenu: '',
    listMap: [
        {
            name: 'recruit',
            iconType: 'pe-7s-add-user',
            korName: '채용공고 관리',
            link: '/board/recruit'
        },
        {
            name: 'notice',
            iconType: 'pe-7s-note2',
            korName: '공지사항 관리',
            link: '/board/notice'
        },
        {
            name: 'faq',
            iconType: 'pe-7s-help1',
            korName: 'FAQ 관리',
            link: '/board/faq'
        },
        {
            name: 'team',
            iconType: 'pe-7s-users',
            korName: '피플펀더 관리',
            link: '/board/team'
        }
    ]
};

const user = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            return action.user;
        case UNSET_USER:
            return action.user;
        default:
            return state;
    }
};

const menu = (state = menuInitialState, action) => {
    switch(action.type) {
        case CHANGE_CURRENT_MENU:
            console.log(CHANGE_CURRENT_MENU);
            console.log(action);
            console.log(action.currentMenu);
            return Object.assign({}, state, {
                menu: {
                    currentMenu: action.currentMenu
                }
            });
        default:
            return state;
    }
};

const isLoading = (state = false, action) => {
    
    switch(action.type) {
        case CHANGE_LOADING_STATUS:
            return action.isLoading;
            
        default:
            return state;
    }
};

const appReducer = combineReducers({
    user,
    menu,
    isLoading
});

export default appReducer;