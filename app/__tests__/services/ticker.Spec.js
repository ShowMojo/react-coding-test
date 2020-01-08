import { expect } from 'chai';

import Ticker from '../../services/ticker';
import { STOCKS } from '../../constants/stocks';

describe('Ticker service', () => {
    let ticker;
    let ticks = [];

    beforeEach(() => {
        ticker = new Ticker({
          onData: (data) => ticks.unshift(data),
        });
    });

    afterEach(() => {
        ticks = [];
    });

    it('should collect at least 2 ticks within 1.5 secs', (done) => {
        // connecting to any Stock with an interval in 0.5 sec
        ticker.connect(STOCKS[0].key, 500);

        setTimeout(() => {
            expect(ticks.length).to.be.gt(2);
            done();
        }, 1500);
    });
});
