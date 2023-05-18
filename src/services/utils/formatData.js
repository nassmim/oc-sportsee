import userAPI from "../src/services/api/user.js"
import { fetchRequests } from "./fetchmocks.js"

const isApiAvailable = true

const getUserMainData = async (userId, isApiAvailable) => {
  let userMainData = {}
  try {
    if (isApiAvailable) userMainData = await userAPI.getUserMainData()
    else userMainData = await fetchRequests.getUserMainData()
  } catch (err) {
    throw new Error(err)
  }

  return userMainData
}

export { getUserMainData }
