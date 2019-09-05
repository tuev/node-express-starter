import User from './user.model'

const updateUser = async (req, res) => {
  const dataUpdate = req.body || {}
  const id = req.params.user_id
  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { ...dataUpdate, _id: id },
      {
        new: true,
        upsert: true
      }
    )
    return res.json(userUpdated)
  } catch (error) {
    return res.send(error)
  }
}

export { updateUser }
