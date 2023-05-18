import axios from "./axios.js"

const apiEnpointStart = "user"

const userAPI = {
  getUserMainData: async (id) => {
    const response = await axios
      .get(`${apiEnpointStart}/${id}`)
      .catch((err) => {
        throw new Error(err)
      })
    return response.data
  },

  getUserDailyActivities: async (id) => {
    const response = await axios
      .get(`${apiEnpointStart}/${id}/activity`)
      .catch((err) => {
        throw new Error(err)
      })
    return response.data
  },
}

export default userAPI
