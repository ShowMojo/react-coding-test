import * as ActionType from '../../actions/ActionType';
import { loadStock } from '../../actions/StockAction';
import { expect } from 'chai';

describe('actions', () => {
    it('should create an action to add stock', () => {
        const payload = {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: '116.60',
            change: '-0.46',
            change_percent: '-0.39',
            last_trade_time: 'Oct 21, 4:00PM EDT',
            dividend: '0.57',
            yield: '1.96'
        };
        const expectedAction = {
            type: ActionType.LOAD_STOCK,
            payload
        };
        expect(loadStock(payload)).to.deep.equal(expectedAction);
    });
});
