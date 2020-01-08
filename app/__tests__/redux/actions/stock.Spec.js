import chai, { expect } from 'chai';
import chaiReduxMockStore from 'chai-redux-mock-store';
import configureStore from 'redux-mock-store';

import * as types from '../../../redux/types/stock';
import * as actions from '../../../redux/actions/stock';

chai.use(chaiReduxMockStore);

describe('Stock actions', () => {
    const createMockStore = (getState) => {
        const middlewares = [];
        return configureStore(middlewares)(getState);
    };

    it('should dispatch SET_CONNECTION_STATUS action', () => {
        const store = createMockStore();

        const action = { type: types.SET_CONNECTION_STATUS, payload: true };
        store.dispatch(action);

        expect(store).to.have.dispatchedActions([action]);
    });

    it('should dispatch NEW_DATA action', () => {
        const store = createMockStore();
        const payload = {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: 162.92,
            change: 95.37,
            change_percent: 0.44,
            last_trade_time: '2020-01-08T14:17:23.000Z',
            dividend: 0.72,
            yield: 0.92,
        };

        const action = { type: types.NEW_DATA, payload };
        store.dispatch(action);

        expect(store).to.have.dispatchedActions([action]);
    });

    it('should dispatch CLEAN action', () => {
        const store = createMockStore();

        const action = { type: types.CLEAN };
        store.dispatch(action);

        expect(store).to.have.dispatchedActions([action]);
    });
});
