const chai = require('chai')
const expect = chai.expect

describe('event rest api test', () => {
  it('it should be get event', done => {
    chai
      .sendLocalRequest()
      .get('/api/v1/event')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).is.an('array')
        done()
      })
  })
})

describe('event rest api test', () => {
  it('it should be created a new event', done => {
    const event = {
      name: 'The First Project ',
      author: 'MrBin',
      description: 'Nothing'
    }
    chai
      .sendLocalRequest()
      .post('/api/v1/event')
      .send(event)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.a('object')
        // expect(res.body).to.have.property('message').eql(` Event ${res.body.name} created `)
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('author')
        // expect(res.body).to.have.property('description')
        done()
      })
  })
})
