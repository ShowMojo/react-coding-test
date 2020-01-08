import io from 'socket.io-client';

const DEFAULT_DELAY_TIME = 5000;
const HOST = 'http://localhost:4000';

class Ticker {
    constructor(params = {}) {
        this.socket = null;

        this.onDisconnect = params.onDisconnect;
        this.onConnect = params.onConnect;
        this.onData = params.onData;
        this.debug = params.debug;
    }

    _log(...params) {
        if (this.debug) {
            console.log(...params);
        }
    }

    connect(stockSymbol, delay = DEFAULT_DELAY_TIME) {
        this.socket = io(HOST);

        this.socket.on('connect', () => {
            this._log('connected');

            this.onConnect && this.onConnect();

            this.socket.on(stockSymbol, (data) => {
                this._log(data);

                try {
                    const parsed = JSON.parse(data);
                    this.onData && this.onData(parsed);
                } catch(error) {
                    console.error(error);
                    this.disconnect();
                }
            });

            this.socket.emit('ticker', stockSymbol, delay);
        });

        this.socket.on('disconnect', () => {
            this._log('disconnected');

            this.socket = null;
            this.onDisconnect && this.onDisconnect();
        });
    }

    disconnect() {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    isConnected() {
        return this.socket && this.socket.connected;
    }
}

export default Ticker;
