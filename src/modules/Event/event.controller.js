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
  const eventData = req.body || {}
  try {
    await Event.create(
      { name: eventData.name,
        author: eventData.author,
        description: eventData.description,
        date: eventData.date,
        price: eventData.price,
        location: eventData.location })
    return res.json({ message: ` Event ${eventData.name} created ` })
  } catch (error) {
    return {
      error: res.json(error.errmsg)
    }
  }
}

const updateEvent = async (req, res) => {
  try {
    await Event.findById(req.params.event_id, (req, res) => {
      res.name = req.body.name
      res.author = req.body.author
      res.description = req.body.description
      res.date = req.body.date
      res.price = req.body.price
      res.location = req.body.location
    })
  } catch (error) {
    return res.send(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.remove({ _id: req.params.event_id })
    return res.json({ message: 'Successfully deleted' })
  } catch (error) {
    return res.send(error)
  }
}

export { getEvent, getEventById, createEvent, updateEvent, deleteEvent }
