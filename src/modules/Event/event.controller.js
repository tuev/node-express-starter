import Event from './event.model'
import { pick } from 'lodash'
import faker from 'faker'
import { mockImgUrl } from './mockImageUrl'

const getEvent = async (req, res) => {
  const events = await Event.find()
  return res.json({
    data: events || []
  })
}

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id)
    return res.json(event)
  } catch (error) {
    return res.send(error)
  }
}

const createEvent = async (req, res) => {
  const eventData = req.body || {}
  const dataCreated = pick(eventData, [
    'name',
    'author',
    'description',
    'date',
    'price',
    'location',
    'image'
  ])

  try {
    const eventInfo = await Event.create(dataCreated)
    return res.json(eventInfo)
  } catch (error) {
    console.error(error)
    return {
      error: res.json(error.errmsg)
    }
  }
}

const updateEvent = async (req, res) => {
  const dataUpdate = req.body
  const id = req.params.event_id
  try {
    const eventUpdated = await Event.findByIdAndUpdate(id, dataUpdate, { new: true })
    return res.json(eventUpdated)
  } catch (error) {
    return res.send(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndRemove({ _id: req.params.event_id })
    return res.json({ message: 'Successfully deleted' })
  } catch (error) {
    return res.send(error)
  }
}

const fakeData = async (req, res) => {
  for (let i = 0; i < 50; i++) {
    const newEvent = {
      name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
      author: faker.name.findName(),
      description: faker.lorem.paragraph(faker.random.number({ min: 150, max: 300 })),
      date: faker.date.future(),
      price: faker.commerce.price(),
      location: faker.fake('{{address.streetAddress}}, {{address.city}}'),
      image: faker.random.arrayElement(mockImgUrl)
    }
    try {
      await Event.create(newEvent)
    } catch (error) {
      console.error(error)
    }
  }
  return res.json({ status: 'ok' })
}

export { getEvent, getEventById, createEvent, updateEvent, deleteEvent, fakeData }
