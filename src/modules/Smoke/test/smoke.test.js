const chai = require('chai')
const expect = chai.expect

describe.skip('smoke rest api test', () => {
  it('get smokes', done => {
    chai
      .sendLocalRequest()
      .get('/smoke')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).is.an('array')
        done()
      })
  })
})
