import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './App';
import DevTools from '../components/DevTools';
import { ENV } from '../config';

// importing application core styles
import 'antd/dist/antd.css';

const isProduction = ENV === 'production';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Route path="/" component={App} />
                </ConnectedRouter>
                {
                    !isProduction && <DevTools /> || null
                }
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
