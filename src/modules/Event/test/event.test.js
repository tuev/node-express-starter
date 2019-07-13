const chai = require('chai')
const expect = chai.expect

describe.only('event rest api test', () => {
  it('get smokes', done => {
    chai
      .sendLocalRequest()
      .get('/event')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).is.an('array')
        done()
      })
  })
})
