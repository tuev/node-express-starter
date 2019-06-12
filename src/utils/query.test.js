import User from '@modules/user/user.model'
import chai from 'chai'
import { controllers } from './query'

const expect = chai.expect
// const UserController = generateControllers(User)

describe('Query utilities test', () => {
  const newUser = {
    username: 'smoke',
    email: 'smoke@smoke.mail',
    password: '123'
  }

  const updateUser = {
    username: 'update_smoke',
    email: 'update_smoke@smoke.mail',
    password: 'update_123'
  }
  it('create One', async () => {
    const user = await controllers.createOne(User, newUser)
    expect(user).to.be.an('object')
    expect(user).to.have.property('username')
    expect(user).to.have.property('email')
    expect(user).to.have.property('createdAt')
    expect(user).to.have.property('password')
    expect(user.username).to.be.equal(newUser.username)
    expect(user.email).to.be.equal(newUser.email)

    expect(user.password).to.be.not.equal(newUser.password)
  })

  it('update One', async () => {
    const createdUser = await controllers.createOne(User, newUser)
    const user = await User.findOne({ _id: createdUser._id })
    const updatedUser = await controllers.updateOne(user, updateUser)
    expect(updatedUser).to.be.an('object')
    expect(updatedUser).to.have.property('username')
    expect(updatedUser).to.have.property('email')
    expect(updatedUser).to.have.property('createdAt')
    expect(updatedUser).to.have.property('password')
    expect(updatedUser.username).to.be.equal(updateUser.username)
    expect(updatedUser.email).to.be.equal(updateUser.email)
    expect(updatedUser.password).to.be.not.equal(newUser.password)
    expect(updatedUser.password).to.be.not.equal(updateUser.password)
  })

  it('delete One', async () => {
    const createdUser = await controllers.createOne(User, newUser)
    const user = await User.findOne({ _id: createdUser._id })
    expect(user).to.be.not.equal(null)

    await controllers.deleteOne(user)
    const userAfterDelete = await User.findOne({ _id: createdUser._id })
    expect(userAfterDelete).to.be.equal(null)
  })

  it('get One', async () => {
    const createdUser = await controllers.createOne(User, newUser)
    const user = await User.findOne({ _id: createdUser._id })
    expect(user).to.be.not.equal(null)
    const foundUser = await controllers.getOne(user)
    expect(foundUser).to.be.an('object')
    expect(foundUser).to.have.property('username')
    expect(foundUser).to.have.property('email')
    expect(foundUser).to.have.property('createdAt')
    expect(foundUser).to.not.have.own.property('password')
    expect(foundUser.username).to.be.equal(foundUser.username)
    expect(foundUser.email).to.be.equal(foundUser.email)
  })

  it('get all', async () => {
    const createdUser = await controllers.createOne(User, newUser)
    const user = await User.findOne({ _id: createdUser._id })
    expect(user).to.be.not.equal(null)

    const userList = await controllers.getAll(User)
    expect(userList).to.be.an('array')
    userList.map(userItem => {
      expect(userItem).to.have.property('username')
      expect(userItem).to.have.property('email')
      expect(userItem).to.have.property('createdAt')
      expect(userItem).to.not.have.own.property('password')
      expect(userItem.username).to.be.equal(userItem.username)
      expect(userItem.email).to.be.equal(userItem.email)
    })
  })

  it('get all', async () => {
    const createdUser = await controllers.createOne(User, newUser)
    const user = await User.findOne({ _id: createdUser._id })
    expect(user).to.be.not.equal(null)

    const foundUser = await controllers.findByParam(User, user._id)
    expect(foundUser).to.be.an('object')
    expect(foundUser).to.have.property('username')
    expect(foundUser).to.have.property('email')
    expect(foundUser).to.have.property('createdAt')
    expect(foundUser).to.not.have.own.property('password')
    expect(foundUser.username).to.be.equal(foundUser.username)
    expect(foundUser.email).to.be.equal(foundUser.email)
  })
})
