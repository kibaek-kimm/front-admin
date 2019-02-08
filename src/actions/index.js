import axios from 'axios';

export const CHANGE_CURRENT_MENU = 'CHANGE_CURRENT_MENU';
export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser() {

    return function(dispatch) {
        axios.get('/api/auth/')
        .then(_response => {
            dispatch({
                type: SET_USER,
                user: _response.data
            })
        })
        .catch(e => {
            console.log('error : ', e);
            dispatch({
                type: SET_USER,
                user: null
            })
        })
    }
}

export function unsetUser() {

    return function(dispatch) {
        axios.get('/api/logout')
        .then(_response => {
            console.log(_response);
            
            dispatch({
                type: UNSET_USER,
                user: null
            })
        })
        .catch(e => {
            console.log('error : ', e);
            dispatch({
                type: UNSET_USER,
                user: null
            })
        })
    }
}

export function changeCurrentMenu(currentMenu, menuTitle) {
    return {
        type: CHANGE_CURRENT_MENU,
        currentMenu,
        menuTitle
    };
}

export function changeLoadingStatus(_value) {
    return {
        type: CHANGE_LOADING_STATUS,
        isLoading: _value
    }
}