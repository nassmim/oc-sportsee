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
}

export default userAPI
