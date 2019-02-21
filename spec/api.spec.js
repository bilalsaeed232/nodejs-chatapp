const request = require('request');

describe('get messages', () => {
    it('should return status code 200', (done) => {
        request.get('http://localhost:3000/api/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    })

    it('should return non empty message list', (done) => {
        request.get('http://localhost:3000/api/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        })
    })
})


describe('post messages', () => {
    it('should return status code 200', (done) => {
        request.post('http://localhost:3000/api/messages', {
            name: 'dd'
        }, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    })
})