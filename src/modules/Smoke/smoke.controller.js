import Smoke from './smoke.model'

const getSmoke = async (req, res) => {
  const smokes = await Smoke.find()
  return res.json({
    data: smokes || []
  })
}

export { getSmoke }
