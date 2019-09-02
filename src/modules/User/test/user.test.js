import User from '../user.model'
const chai = require('chai')
const expect = chai.expect

// Get all user
describe('user rest api test', () => {
  it('it should be get user', done => {
    chai
      .sendLocalRequest()
      .get('/api/v1/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).is.an('array')
        done()
      })
  })

  it('it should be get only 1 user by id', done => {
    const id = '6d4e7d9df2541d3dd9bd6276'
    chai
      .sendLocalRequest()
      .get(`/api/v1/user/${id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).is.an('object')
        expect(res.body._id).to.equal(id)
        done()
      })
  })

  it('it should be created a new user', done => {
    const user = {
      displayName: 'test user 2',
      uid: '126467gjhgsadkaqwe',
      email: 'ytry@kjahkj'
    }
    chai
      .sendLocalRequest()
      .post('/api/v1/user')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('displayName')
        expect(res.body).to.have.property('uid')
        expect(res.body).to.have.property('email')
        done()
      })
  })

  it('it should be updated', done => {
    const user = {
      displayName: 'user 3'
    }

    const keys = Object.keys(user)
    const id = '6d4e7d9df2541d3dd9bd6276'
    chai
      .sendLocalRequest()
      .put(`/api/v1/user/${id}`)
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

  it('it should be delete only 1 user by id', done => {
    const id = '6d4e7d9df2541d3dd9bd6276'
    chai
      .sendLocalRequest()
      .delete(`/api/v1/user/${id}`)
      .set('Accept', 'application/json')
      .expect(204)
      .end(async (err, res) => {
        if (err) return done(err)
        const user = await User.findById(id)
        // eslint-disable-next-line no-unused-expressions
        expect(user).to.be.null
        done()
      })
  })
})
