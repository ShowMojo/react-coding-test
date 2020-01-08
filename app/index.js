import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from './redux/configureStore';
import Root from './containers/Root';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = configureStore({}, middleware);

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const newConfigureStore = require('./redux/configureStore');
        const newStore = newConfigureStore.configureStore({}, middleware);
        const newHistory = newConfigureStore.history;
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={newStore} history={newHistory} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
