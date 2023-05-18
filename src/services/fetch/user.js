const URL = "mocks/data"

export const fetchRequests = {
  getUserMainData: async (userId) => {
    let results = {}
    try {
      const response = await fetch(URL)
      results = await response.json()
    } catch (err) {
      throw new Error(err)
    }

    const userData = results.filter((item) => item.id === userId)
    return userData
  },
}
