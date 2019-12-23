import { connectToServer, disconnectServer } from '../../services';
import { expect } from 'chai';

describe('api', () => {
    it('should be called in interval 500 ms with 10 ms error', (done) => {
        let count = 0;
        let duration = 0;
        let lastTime = 0;
        connectToServer('APPL', 500, stock => {
            if (lastTime === 0 || count > 3) {
                lastTime = new Date().getTime();
                return;
            }
            let currentTime = new Date().getTime();
            count++;
            duration += (currentTime - lastTime);
            lastTime = currentTime;
            if (count == 3) {
                disconnectServer();
                expect(Math.abs(duration / count - 500)).not.greaterThan(10);
                done();
            }
        });
    });
});
