import { combineReducers } from 'redux';
import stock from './reducers/stock';

const rootReducer = combineReducers({
    stock,
});

export default rootReducer;
