import Event from '../event.model'
import { get } from 'lodash'
const chai = require('chai')
const expect = chai.expect

// Get all event
describe('event rest api test', () => {
  let tokenInfo = ''
  beforeEach(async () => {
    const user = {
      displayName: 'user 3'
    }
    const id = '6d4e7d9df2541d3dd9bd6276'
    const response = await chai
      .sendLocalRequest()
      .put(`/api/v1/oauth/${id}`)
      .send(user)
      .set('Accept', 'application/json')
    tokenInfo = get(response, ['body', 'token'])
  })

  it('it should be get event', done => {
    chai
      .sendLocalRequest()
      .get('/api/v1/event')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).is.an('array')
        done()
      })
  })

  it('it should be get only 1 event by id', done => {
    const id = '5d4e7d9df2541d3dd9bd6275'
    chai
      .sendLocalRequest()
      .get(`/api/v1/event/${id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).is.an('object')
        expect(res.body._id).to.equal(id)
        done()
      })
  })

  it('it cannot be created a new event', done => {
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
      .expect(401)
      .end(done)
  })

  it('it cannot be updated', done => {
    const event = {
      name: 'The First Project 3'
    }
    const id = '5d4e7d9df2541d3dd9bd6275'

    chai
      .sendLocalRequest()
      .put(`/api/v1/event/${id}`)
      .send(event)
      .set('Accept', 'application/json')
      .expect(401)
      .end(done)
  })

  it('it cannot be deleted only 1 event by id', done => {
    const id = '5d4e7d9df2541d3dd9bd6275'
    chai
      .sendLocalRequest()
      .delete(`/api/v1/event/${id}`)
      .set('Accept', 'application/json')
      .expect(401)
      .end(done)
  })

  // Auhorization

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
      .set('Authorization', `Bearer ${tokenInfo}`)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('author')
        expect(res.body).to.have.property('description')
        done()
      })
  })

  it('it should be updated', done => {
    const event = {
      name: 'The First Project 3'
    }

    const keys = Object.keys(event)
    const id = '5d4e7d9df2541d3dd9bd6275'
    chai
      .sendLocalRequest()
      .put(`/api/v1/event/${id}`)
      .send(event)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tokenInfo}`)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err)
        const eventUpdated = res.body
        expect(eventUpdated).to.be.a('object')
        keys.map(key =>
          expect(eventUpdated)
            .to.have.property(key)
            .to.equal(event[key])
        )
        done()
      })
  })

  it('it should be delete only 1 event by id', done => {
    const id = '5d4e7d9df2541d3dd9bd6275'
    chai
      .sendLocalRequest()
      .delete(`/api/v1/event/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tokenInfo}`)
      .expect(204)
      .end(async (err, res) => {
        if (err) return done(err)
        const event = await Event.findById(id)
        // eslint-disable-next-line no-unused-expressions
        expect(event).to.be.null
        done()
      })
  })
})
