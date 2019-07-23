import Event from './event.model'

const getEvent = async (req, res) => {
  const events = await Event.find()
  return res.json({
    data: events || []
  })
}

const getEventById = async (req, res) => {
  await Event.findById(req.params.event_id, (err, event) => {
    if (err) {
      res.send(err)
    }
    res.json(event)
  })
}

const createEvent = async (req, res) => {
  const eventData = req.body
  console.log('eventData', eventData)
  try {
    await Event.create(
      { name: eventData.name,
        author: eventData.author,
        description: eventData.description,
        date: eventData.date,
        price: eventData.price,
        location: eventData.location })
    return res.send(` Event ${eventData.name} created `)
  } catch (error) {
    return {
      error: res.json(error.errmsg)
    }
  }
}

const updateEvent = async (req, res) => {
  await Event.findById(req.params.event_id, (err, event) => {
    if (err) {
      res.send(err)
    }
    event.name = req.body.name
    event.author = req.body.author
    event.description = req.body.description
    event.date = req.body.date
    event.price = req.body.price
    event.location = req.body.location
  })
}

const deleteEvent = async (req, res) => {
  await Event.remove({ _id: req.params.event_id }, (err, event) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Successfully deleted' })
  })
}

export { getEvent, getEventById, createEvent, updateEvent, deleteEvent }
