import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import DevTools from '../components/DevTools';
import { ENV } from '../config';

export function configureStore(initialState, middleware) {
    const enhancements = [applyMiddleware(thunkMiddleware, middleware)];

    if (ENV !== 'production') {
        enhancements.push(DevTools.instrument());
    }

    return createStore(
        rootReducer,
        initialState,
        compose(...enhancements),
    );
}
