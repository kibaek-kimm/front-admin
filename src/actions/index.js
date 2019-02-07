export const CHANGE_CURRENT_MENU = 'CHANGE_CURRENT_MENU';
export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS';
export const SET_USER = 'SET_USER';

// export function increment() {
//     return {
//         type: INCREMENT
//     };
// }
//
// export function decrement() {
//     return {
//         type: DECREMENT
//     };
// }

export function setUser(userInfo) {
    return {
        type: SET_USER,
        userInfo
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