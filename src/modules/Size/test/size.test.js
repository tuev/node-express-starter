import Size from '../size.model'
const chai = require('chai')
const expect = chai.expect

describe.skip('size graphql test', () => {
  it('get sizes', done => {
    chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          query{
            sizes{
              id
             }
           }`
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.sizes
        expect(data).is.to.be.an('array')
        done()
      })
  })

  it('get size', async () => {
    const findsize = await Size.findOne({ name: 'size_test' })
    const result = await chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          query{
            size(id: "${findsize._id}"){
              id
             }
           }`
      })

    const status = result.status
    expect(status).to.be.equal(200)
    const data = result.body.data
    expect(data).is.to.be.an('object')
  })

  it('add size', done => {
    const newsize = {
      name: 'new size',
      value: 'blue'
    }
    chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation{
            addsize(name: "${newsize.name}", value: "${newsize.value}"){
              id
             }
           }`
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data
        expect(data).is.to.be.an('object')
        done()
      })
  })

  it('delete size', async () => {
    const newsize = await Size.create({
      name: 'size',
      slug: 'slug',
      value: 'yellow'
    })
    const result = await chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation{
            deletesize(id: "${newsize._id}")
           }`
      })
    const status = result.status
    expect(status).to.be.equal(200)
    const data = result.body.data
    expect(data).is.to.be.an('object')
    expect(data.deletesize).is.to.be.equal(true)
  })
})
