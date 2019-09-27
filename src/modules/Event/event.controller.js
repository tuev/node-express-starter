import Event from './event.model'
import ImageModel from '../Image/image.model'

import { checkAuthorization } from '@utils'
import { pick, get, isEmpty, values } from 'lodash'
import faker from 'faker'
import { mockImgUrl, mockBannerImg } from './mockImageUrl'
import cloudinary from 'cloudinary'

const getEvent = async (req, res) => {
  const isAuthorized = await checkAuthorization(req)
  if (isAuthorized) {
    const events = await Event.find()
    return res.json(events || [])
  } else {
    const events = await Event.find({ status: 'published' })
    return res.json(events || [])
  }
}

const getEventById = async (req, res) => {
  const { populate = [] } = req.query
  try {
    const event = await Event.findById(req.params.event_id).populate(populate)
    return res.json(event)
  } catch (error) {
    return res.send(error)
  }
}

const createEvent = async (req, res) => {
  const eventData = req.body || {}
  const author = req.body.author
  const dataCreated = pick(eventData, [
    'name',
    'description',
    'date',
    'price',
    'address',
    'timeStart',
    'timeEnd',
    'organizer',
    'type',
    'addressType',
    'category',
    'status'
  ])

  try {
    const eventInfo = await Event.create({ ...dataCreated, author })
    return res.status(201).json(eventInfo)
  } catch (error) {
    console.error(error)
    return {
      error: res.json(error.errmsg)
    }
  }
}

const updateEvent = async (req, res) => {
  const id = req.params.event_id

  const event = await Event.findById(id)
  if (!event) {
    return res.status(404).send('Event not found')
  }
  const dataUpdate = req.body

  const newData = pick(dataUpdate, [
    'name',
    'description',
    'date',
    'price',
    'address',
    'timeStart',
    'timeEnd',
    'organizer',
    'type',
    'addressType',
    'category',
    'status',
    'banner'
  ])

  const fileValue = values(req.files)
  let url = newData.banner || event.banner
  if (!isEmpty(fileValue)) {
    const promises = fileValue.map(image =>
      cloudinary.uploader.upload(image.path)
    )
    const result = await Promise.all(promises)
    const image = await ImageModel.create(result[0])
    url = get(image, '_id')
  }

  try {
    const eventUpdated = await Event.findByIdAndUpdate(
      id,
      { ...newData, banner: url },
      {
        new: true
      }
    )
    return res.json(eventUpdated)
  } catch (error) {
    return res.send(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndRemove({ _id: req.params.event_id })
    // todo: delete image from  cloudinary
    return res.status(204).json({ message: 'Successfully deleted' })
  } catch (error) {
    return res.send(error)
  }
}

const fakeData = async (req, res) => {
  for (let i = 0; i < 50; i++) {
    const newEvent = {
      name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
      author: faker.name.findName(),
      description: faker.lorem.paragraph(
        faker.random.number({ min: 150, max: 300 })
      ),
      date: faker.date.future(),
      price: faker.commerce.price(),
      location: faker.fake('{{address.streetAddress}}, {{address.city}}'),
      image: faker.random.arrayElement(mockImgUrl),
      banner: faker.random.arrayElement(mockBannerImg)
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
