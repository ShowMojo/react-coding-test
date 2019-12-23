import '../styles/application.scss';
import {connectToServer} from '../services';
import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import STOCK_SYMBOLS from '../constants/symbols';
import { connect } from 'react-redux';
import { loadStock } from '../actions/StockAction';
import StockInspectorContainer from './StockInspectorContainer';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, {value}) {
        connectToServer(value, 500, this.props.loadStock);
    }

    render() {
        const tickerOptions = STOCK_SYMBOLS.map(symbol => (
            { key: symbol, value: symbol, text: symbol }
        ));
        return (
            <div className="stock-ticker">
                <h1>Stock Blotter</h1>
                <Dropdown placeholder="Select ticker symbol"
                    options={tickerOptions}
                    search
                    selection
                    onChange={this.handleChange}
                />
                <StockInspectorContainer />
            </div>
        );
    }
}

export default connect(state => ({...state}), { loadStock: (stock) => async (dispatch) => dispatch(loadStock(stock)) })(App);
