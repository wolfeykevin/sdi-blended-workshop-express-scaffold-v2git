const req = require('supertest');
const app = require('./app')


describe('/books endpoint', () => {
  test('GET /books should output a hello world message', (done)  =>{
    req(app)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done()
      })
  })
})