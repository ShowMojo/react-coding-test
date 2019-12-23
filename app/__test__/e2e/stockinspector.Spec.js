import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { loadStock } from '../../actions/StockAction';
import StockInspectorContainer from '../../components/StockInspectorContainer';
import 'jsdom-global/register';
import StockInspector from '../../components/StockInspector';
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js'
};
global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
copyProps(window, global);

describe('stockInspector component', () => {
    let store, wrapper;
    let cleanup;

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

    const positivePayload = {
        ticker:'AAME',
        exchange:'NASDAQ',
        price:'117.24',
        change:'99.58',
        change_percent:'0.84',
        last_trade_time:'2019-12-19T01:10:01.000Z',
        dividend:'0.33',
        yield:'1.73'
    };

    beforeEach(() => {
        require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
        cleanup = require('jsdom-global')();
        store = createStore(rootReducer, { current: null, change: 0 });
        wrapper = mount(<Provider store={store}><StockInspectorContainer /></Provider>);
    });

    afterEach(() => cleanup());
    
    it('render the connected component', () => {
        expect(wrapper.find(StockInspectorContainer).length).equal(1);
    });

    it('check Prop matches with state', () => {
        store.dispatch(loadStock(payload));
        expect(wrapper.find(StockInspector).prop('current')).to.deep.equal(payload);
        expect(wrapper.find(StockInspector).prop('change')).to.deep.equal(payload.change);
    });

    it('check change color with state', () => {
        store.dispatch(loadStock(payload));
        let style = wrapper.find(StockInspector).find('span').get(0).style;
        expect(style).to.have.property('color', 'red');

        store.dispatch(loadStock(positivePayload));
        style = wrapper.find(StockInspector).find('span').get(0).style;
        expect(style).to.have.property('color', 'green');
    });
});
