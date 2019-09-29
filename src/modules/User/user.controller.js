import User from './user.model'
import { pick } from 'lodash'

import jwt from 'jsonwebtoken'
const updateUser = async (req, res) => {
  const data = req.body || {}
  const dataUpdate = pick(data, [
    'displayName',
    'uid',
    'email',
    'photoURL',
    'role',
    'events'
  ])
  const id = req.params.user_id

  try {
    const userUpdated = await User.findOneAndUpdate(
      { uid: id },
      { ...dataUpdate },
      {
        new: true,
        upsert: true
      }
    )

    const token = jwt.sign({ userId: userUpdated._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN_MS
    })
    return res.json({ ...userUpdated.toJSON(), token })
  } catch (error) {
    return res.status(404).send(error)
  }
}

export { updateUser }
