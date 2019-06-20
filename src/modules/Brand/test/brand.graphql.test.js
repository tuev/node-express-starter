import Brand from '../brand.model'
const chai = require('chai')
const expect = chai.expect

describe('Brand graphql test', () => {
  it('get brands', done => {
    chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          query{
            brands{
              id
             }
           }`
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.brands
        expect(data).is.to.be.an('array')
        done()
      })
  })

  it('get brands', async () => {
    const findBrand = await Brand.findOne({ name: 'brand_test' })
    const result = await chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          query{
            brand(id: "${findBrand._id}"){
              id
             }
           }`
      })

    const status = result.status
    expect(status).to.be.equal(200)
    const data = result.body.data
    expect(data).is.to.be.an('object')
  })

  it('add brands', done => {
    const newBrand = {
      name: 'new brand'
    }
    chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation{
            addBrand(name: "${newBrand.name}"){
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

  it('delete brands', async () => {
    const newBrand = await Brand.create({ name: 'brand', slug: 'slug' })

    const result = await chai
      .sendLocalRequest()
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation{
            deleteBrand(id: "${newBrand._id}")
           }`
      })
    const status = result.status
    expect(status).to.be.equal(200)
    const data = result.body.data
    expect(data).is.to.be.an('object')
    expect(data.deleteBrand).is.to.be.equal(true)
  })
})
