import {CHANGE_CURRENT_MENU, CHANGE_LOADING_STATUS, SET_USER} from '../actions';
import { combineReducers } from 'redux';

const menuInitialState = {
    currentMenu: 'recruit',
    listMap: [
        {
            name: 'board',
            korName: '게시판 관리',
            subMenu: [
                {
                    name: 'recruit',
                    korName: '채용공고'
                },
                {
                    name: 'notice',
                    korName: '공지사항'
                },
                {
                    name: 'faq',
                    korName: 'FAQ'
                },
                {
                    name: 'people',
                    korName: '피플펀드사람들'
                }
            ]
        }
    ]
};

const user = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            console.log('reducer : ',state);
            console.log('reducer-action : ',action);
            return action.user;
            break;
        default:
            return state;
    }
};

const menu = (state = menuInitialState, action) => {
    switch(action.type) {
        case CHANGE_CURRENT_MENU:
            console.log(action);
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
            break;
            
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