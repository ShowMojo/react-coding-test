import * as types from '../types/stock';

const handlers = {
    [types.SET_CONNECTION_STATUS]: (state, { payload: connectionStatus }) => {
        return {
            ...state,
            connectionStatus,
        };
    },
    [types.NEW_DATA]: (state, { payload: data }) => {
        return {
            ...state,
            lastTick: data,
            ticks: [data].concat(state.ticks),
        };
    },
    [types.CLEAN]: (state) => {
        return {
            ...state,
            lastTick: null,
            ticks: [],
        };
    },
};

export const initialState = {
    connectionStatus: false,
    ticks: [],
    lastTick: null,
};

export default function Ticker(state = initialState, payload) {
    const handler = handlers[payload.type];
    return handler && handler(state, payload) || state;
}
