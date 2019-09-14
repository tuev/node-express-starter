import User from './user.model'

import jwt from 'jsonwebtoken'
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

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN_MS
    })
    return res.json({ ...userUpdated.toJSON(), token })
  } catch (error) {
    return res.send(error)
  }
}

export { updateUser }
