import Event from './event.model'
import { pick } from 'lodash'

const getEvent = async (req, res) => {
  const events = await Event.find()
  return res.json({
    data: events || []
  })
}

const getEventById = async (req, res) => {
  try {
    await Event.findById(req.params.event_id, (_err, event) => {
      return res.json(event)
    })
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
    'location'
  ])

  try {
    const eventInfo = await Event.create(dataCreated)
    return res.json(eventInfo)
  } catch (error) {
    return {
      error: res.json(error.errmsg)
    }
  }
}

const updateEvent = async (req, res) => {
  try {
    const eventUpdated = await Event.findByIdAndUpdate(req.params.event_id, {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price,
      location: req.body.location
    }, { new: true })
    console.log(eventUpdated)
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

export { getEvent, getEventById, createEvent, updateEvent, deleteEvent }
