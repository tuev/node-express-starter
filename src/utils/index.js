import { generateControllers } from './query'

export const returnOnError = (operation, alternative) => {
  try {
    return operation()
  } catch (e) {
    return alternative
  }
}

export const passwordRegEx = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/
export const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export { generateControllers }
