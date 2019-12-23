import { LOAD_STOCK } from '../actions/ActionType';

const initialState = {
    current: null,
    change: 0
};

const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STOCK:
            return { ...state,
                change: action.payload.change,
                current: action.payload
            };
        default:
            return state;
    }
};

export default stockTicker;
