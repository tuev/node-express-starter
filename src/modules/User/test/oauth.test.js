const chai = require('chai')
const expect = chai.expect

describe('oauth api test', () => {
  it('it should be updated', done => {
    const user = {
      displayName: 'user 3'
    }
    const keys = Object.keys(user)
    const id = '6d4e7d9df2541d3dd9bd6276'
    chai
      .sendLocalRequest()
      .put(`/api/v1/oauth/${id}`)
      .send(user)
      .set('Accept', 'application/json')
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err)
        const userUpdated = res.body
        expect(userUpdated).to.be.a('object')
        keys.map(key =>
          expect(userUpdated)
            .to.have.property(key)
            .to.equal(user[key])
        )
        done()
      })
  })
})
