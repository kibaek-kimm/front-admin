import axios from 'axios';

export const CHANGE_CURRENT_MENU = 'CHANGE_CURRENT_MENU';
export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS';
export const SET_USER = 'SET_USER';

export function setUser() {

    return function(dispatch) {
        axios.get('/api/auth')
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

export function changeCurrentMenu(newCurrentMenu, menuTitle) {
    return {
        type: CHANGE_CURRENT_MENU,
        newCurrentMenu,
        menuTitle
    };
}

export function changeLoadingStatus(_value) {
    // console.log('%c changeLoadingStatus ACTION : ', 'color: #ff0000;background:yellow;');
    // console.log('| _value : ',_value);
    // console.log('%c changeLoadingStatus ACTION END: ', 'color: #ff0000;background:yellow;');
    return {
        type: CHANGE_LOADING_STATUS,
        isLoading: _value
    }
}