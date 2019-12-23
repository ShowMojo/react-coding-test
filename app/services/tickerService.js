import io from 'socket.io-client';

let socket = null;

export const disconnectServer = () => {
    if (socket !== null && socket.connected) {
        socket.disconnect();
        socket = null;
    }
};

export const connectToServer = (stockSymbol, interval, callback) => {
    disconnectServer();

    socket = io('http://localhost:4000');

    socket.on('connect', () => {
        console.log('connected');

        socket.on(stockSymbol, (data) => {
            callback(JSON.parse(data));
        });

        socket.emit('ticker', stockSymbol, interval);
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
};
