import React from 'react';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import JSDOMGlobal from 'jsdom-global';

import App from '../../containers/App';
import { configureStore } from '../../redux/configureStore';
import * as actions from '../../redux/actions/stock';

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

describe('Stock component', () => {
    let store, wrapper;
    let cleanup;

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

    beforeEach(() => {
        cleanup = JSDOMGlobal();
        store = configureStore({}, routerMiddleware(createBrowserHistory()));
        wrapper = mount(
          <Provider store={store}>
            <App />
          </Provider>
        );
    });

    afterEach(() => cleanup());

    it('render the connected component', () => {
        expect(wrapper.find(App).length).equal(1);
    });

    it('check dynamics text', () => {
        store.dispatch(actions.newData(existingTick));

        const dynamicElement = wrapper.find(App).find('.dynamics-value');
        expect(Number(dynamicElement.text())).to.equal(existingTick.price);

        store.dispatch(actions.newData(newTick));
        expect(Number(dynamicElement.text())).to.equal(newTick.price - existingTick.price);
    });
});
