import userAPI from "./api/user.js"
// import { fetchRequests } from "./fetch/user.js"
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/data.js"

const isApiAvailable = true

const services = {
  /**
   *
   * @param { String || Number } userId
   * @returns { Object } representing the user main information and diet stats
   */
  getUserMainData: async (userId) => {
    let userMainData = {}

    if (isApiAvailable) {
      const response = await userAPI.getUserMainData(userId).catch((err) => {
        throw new Error(err)
      })
      userMainData = response.data
    } else {
      userMainData = USER_MAIN_DATA.filter((user) => user.id === userId)[0]
    }

    // We noticed the objectives score property was not always named similarly
    const score = (userMainData.todayScore || userMainData.score) * 100
    userMainData = {
      ...userMainData,
      score: score,
    }

    return userMainData
  },

  /**
   *
   * @param { String || Number } userId
   * @returns { Array } representing the user list of daily activity per day
   */
  getUserDailyActivities: async (userId) => {
    let userActivities
    if (isApiAvailable) {
      const response = await userAPI
        .getUserDailyActivities(userId)
        .catch((err) => {
          throw new Error(err)
        })
      userActivities = response.data
    } else {
      userActivities = USER_ACTIVITY.filter((user) => user.userId === userId)[0]
    }

    return userActivities.sessions
  },

  /**
   *
   * @param { String || Number } userId
   * @returns { Array } representing the user list of average session per day
   */
  getUserAverageSessions: async (userId) => {
    let userAverageSessions
    if (isApiAvailable) {
      const response = await userAPI
        .getUserAverageSessions(userId)
        .catch((err) => {
          throw new Error(err)
        })
      userAverageSessions = response.data
    } else {
      userAverageSessions = USER_AVERAGE_SESSIONS.filter(
        (user) => user.userId === userId
      )[0]
    }

    return userAverageSessions.sessions
  },

  /**
   *
   * @param { String || Number } userId
   * @returns { Object } representing the user performances
   */
  getUserPerformance: async (userId) => {
    let userPerformance = {}

    if (isApiAvailable) {
      const response = await userAPI.getUserPerformance(userId).catch((err) => {
        throw new Error(err)
      })
      userPerformance = response.data
    } else {
      userPerformance = USER_PERFORMANCE.filter(
        (user) => user.userId === userId
      )[0]
    }

    return userPerformance
  },
}

export default services
