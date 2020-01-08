import * as types from '../types/stock';

export const setStatus = (status) => (dispatch) => {
    if (!status) {
        cleanData();
    }

    return dispatch({
        type: types.SET_CONNECTION_STATUS,
        payload: status,
    });
};

export const newData = (data) => (dispatch) => {
    return dispatch({
        type: types.NEW_DATA,
        payload: data,
    });
};

export const cleanData = () => (dispatch) => {
    return dispatch({
        type: types.CLEAN,
    });
};
