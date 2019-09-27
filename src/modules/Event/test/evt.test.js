import Event from '../event.model'
import { get, isEmpty } from 'lodash'
const chai = require('chai')
const expect = chai.expect

// Get all event
describe('evt rest api test', () => {
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

  it('it should be get event for everyone', done => {
    chai
      .sendLocalRequest()
      .get('/api/v1/evt')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body
        expect(res.body).is.an('array')
        if (!isEmpty(data)) {
          const isAnyDraft = data.some(item => item.status === 'draft')
          // eslint-disable-next-line no-unused-expressions
          expect(isAnyDraft).is.false
        }

        done()
      })
  })

  it('it should be get event for owner manage', done => {
    chai
      .sendLocalRequest()
      .get('/api/v1/evt')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tokenInfo}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body
        expect(res.body).is.an('array')
        if (!isEmpty(data)) {
          const isAnyDraft = data.some(item => item.status === 'draft')
          // eslint-disable-next-line no-unused-expressions
          expect(isAnyDraft).is.true
        }

        done()
      })
  })

  it('it should be get only 1 event by publish id with every one', done => {
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

  it('it cannot get event by draft id with every one', done => {
    const id = '5d4e7d9df2541d3dd9bd6271'
    chai
      .sendLocalRequest()
      .get(`/api/v1/event/${id}`)
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it('it can get event by draft id with owner', done => {
    const id = '5d4e7d9df2541d3dd9bd6271'
    chai
      .sendLocalRequest()
      .get(`/api/v1/event/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tokenInfo}`)
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
      .post('/api/v1/evt')
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

  it('it cannot be updated with different author', done => {
    const event = {
      name: 'The First Project 3'
    }
    const id = '5d4e7d9df2541d3dd9bd6275'
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2ZDRlN2Q5ZGYyNTQxZDNkZDliZDYyNzYiLCJpYXQiOjE1NjkzNDA4MjksImV4cCI6MTU2OTM0MzcwOX0.lcA0s0doSKlmjTl3gIzLU6TfzdtVK9xMWzW_FEaYQjQ infp'
    chai
      .sendLocalRequest()
      .put(`/api/v1/event/${id}`)
      .send(event)
      .set('Authorization', `Bearer ${fakeToken}`)
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

  it('it cannot be deleted only 1 event by id with different author', done => {
    const id = '5d4e7d9df2541d3dd9bd6275'
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2ZDRlN2Q5ZGYyNTQxZDNkZDliZDYyNzYiLCJpYXQiOjE1NjkzNDA4MjksImV4cCI6MTU2OTM0MzcwOX0.lcA0s0doSKlmjTl3gIzLU6TfzdtVK9xMWzW_FEaYQjQ infp'
    chai
      .sendLocalRequest()
      .delete(`/api/v1/event/${id}`)
      .set('Authorization', `Bearer ${fakeToken}`)
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
      .post('/api/v1/evt')
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
