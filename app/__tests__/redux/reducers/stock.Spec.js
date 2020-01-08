import { expect } from 'chai';

import reducer, { initialState } from '../../../redux/reducers/stock';
import * as types from '../../../redux/types/stock';

describe('Stock reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).equal(initialState);
    });

    it('should handle SET_CONNECTION_STATUS', () => {
        expect(
          reducer(initialState, {
            type: types.SET_CONNECTION_STATUS,
            payload: false,
          })
        ).eql({
          ...initialState,
          connectionStatus: false,
        });
    });

    it('should handle NEW_DATA', () => {
        const existingTick = {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: 162.92,
            change: 95.37,
            change_percent: 0.44,
            last_trade_time: '2020-01-08T14:17:23.000Z',
            dividend: 0.72,
            yield: 0.92,
        };

        const newTick = {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: 295.58,
            change: 110.09,
            change_percent: 0.49,
            last_trade_time: '2020-01-08T14:17:28.000Z',
            dividend: 0.91,
            yield: 1.97
        };

        expect(
          reducer({
              ...initialState,
              ticks: [existingTick],
          }, {
              type: types.NEW_DATA,
              payload: newTick,
          })
        ).eql({
            ...initialState,
            lastTick: newTick,
            ticks: [newTick, existingTick],
        });
    });

    it('should handle CLEAN', () => {
        expect(
            reducer(initialState, {
                type: types.CLEAN,
            })
        ).eql(initialState);
    });
})
