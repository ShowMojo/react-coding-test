import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Button, Select } from 'antd';

import Ticker from '../../services/ticker';
import { format } from '../../utils/number';
import { STOCKS } from '../../constants/stocks';
import * as actions from '../../redux/actions/stock';
import styles from './styles.scss';

class App extends PureComponent {
    constructor(props) {
        super(props);

        // initialize ticker object with all necessary handlers
        const ticker = new Ticker({
            debug: true,
            onConnect: () => props.actions.setStatus(true),
            onDisconnect: () => props.actions.setStatus(false),
            onData: (data) => props.actions.newData(data),
        });

        this.state = {
            ticker,
            currentStock: null,
            defaultStock: STOCKS[0].key,
        };
    }

    componentWillUnmount() {
        this.disconnect();
    }

    disconnect() {
        this.state.ticker.disconnect();
    }

    connect(stock) {
        this.state.ticker.connect(stock || this.state.defaultStock);
    }

    handleConnection = () => {
        if (this.props.isConnected) {
            return this.disconnect();
        }

        this.connect();
    }

    handleStockChange = (value) => {
        // TODO: make sure custom popups are being used here later
        /* eslint-disable */
        if (!window.confirm('Previously collected data will be lost. Do you wish to continue?')) {
            return;
        }
        /* eslint-enable */

        // udpate curernt stock selected value
        this.setState({
            ...this.state,
            currentStock: value,
        });

        // clean current ticks info
        this.props.actions.cleanData();

        // reconnect service stream
        this.disconnect();
        this.connect(value);
    }

    getDynamics() {
        const { ticks, lastTick } = this.props;

        if (ticks.length < 2) {
            return format(lastTick && lastTick.price || 0);
        }

        // newest on the top
        const previousTick = ticks[1];
        return format(lastTick.price - (previousTick.price || 0));
    }

    render() {
        const { isConnected, ticks } = this.props;
        const { defaultStock } = this.state;
        const ToggleButtonText = isConnected
            ? 'Disconnect'
            : 'Connect';

        return (
            <div className={styles.container}>
                <h1>Stock Blotter</h1>

                <div className={styles.formElement}>
                    <Select defaultValue={defaultStock} onChange={this.handleStockChange}>
                        {
                            STOCKS.map(
                                (stock, index) => (
                                    <Select.Option key={index} value={stock.key}>
                                        { stock.name }
                                    </Select.Option>
                                )
                            )
                        }
                    </Select>
                </div>
                <div className={styles.formElement}>
                    <Button type="primary" className="connection-button" onClick={this.handleConnection}>
                        { ToggleButtonText }
                    </Button>
                </div>
                <div className={styles.dynamics}>
                    Dynamics: <span className="dynamics-value">{ this.getDynamics() }</span>
                </div>
                <div className={styles.ticksContainer}>
                    {
                        ticks.map(
                            (tick, index) => (
                                <div className={styles.tickItem} key={index}>
                                      <div>
                                          Price: { tick.price }
                                      </div>
                                      <div>
                                          Change: { tick.change }
                                      </div>
                                      <div>
                                          Last trade time: { moment(tick.last_trade_time).format('HH:mm:ss, MM.DD.YYYY') }
                                      </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ stock }) => ({
    isConnected: stock.connectionStatus,
    ticks: stock.ticks,
    lastTick: stock.lastTick,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
