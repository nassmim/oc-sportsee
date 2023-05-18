import { useEffect, useState } from "react"
import userAPI from "../api/user.js"

import Diet from "../components/Diet.jsx"
import BarChart from "../components/BarChart.jsx"
import SessionDurationChart from "../components/SessionDurationChart.jsx"
import RadarChart from "../components/RadarChart.jsx"
import RadialChart from "../components/RadialChart.jsx"
import profileCSS from "../css/profile.module.css"

const profiles = [
  {
    id: 12,
    name: "Karl",
  },
  {
    id: 18,
    name: "Cecilia",
  },
]

export default function Profile() {
  const [userId, setUserId] = useState(profiles[0].id)
  const [userMainData, setUserMainData] = useState(null)
  const [userDailyActivities, setUserDailyActivities] = useState(null)
  const [userAverageSessions, setUserAverageSessions] = useState(null)
  const [userPerformance, setUserPerformance] = useState(null)

  const getUserMainData = async () => {
    let apiResults = {}
    try {
      apiResults = await userAPI.getUserMainData(userId)
    } catch (err) {
      console.log(err)
      return
    }

    let newUserData = apiResults.data

    const score = (newUserData.todayScore || newUserData.score) * 100
    newUserData = {
      ...newUserData,
      score: score,
    }

    setUserMainData(newUserData)
  }

  const getUserDailyActivities = async () => {
    let apiResults = {}
    try {
      apiResults = await userAPI.getUserDailyActivities(userId)
    } catch (err) {
      console.log(err)
      return
    }

    const newUserDailyActivities = apiResults.data.sessions
    setUserDailyActivities(newUserDailyActivities)
  }

  const getUserAverageSessions = async () => {
    let apiResults = {}
    try {
      apiResults = await userAPI.getUserAverageSessions(userId)
    } catch (err) {
      console.log(err)
      return
    }
    const newUserAverageSessions = apiResults.data.sessions
    setUserAverageSessions(newUserAverageSessions)
  }

  const getUserPerformance = async () => {
    let apiResults = {}
    try {
      apiResults = await userAPI.getUserPerformance(userId)
    } catch (err) {
      console.log(err)
      return
    }

    const newUserPerformance = apiResults.data
    setUserPerformance(newUserPerformance)
  }

  useEffect(() => {
    getUserMainData()
    getUserDailyActivities()
    getUserAverageSessions()
    getUserPerformance()
  }, [userId])

  const profileToDisplay = profiles.filter((user) => user.id !== userId)[0]

  return (
    <>
      <div className={profileCSS.profile}>
        <div className={profileCSS.welcome}>
          <h1 className={profileCSS.welcomeTitle}>
            Bonjour{" "}
            <span className={profileCSS.username}>
              {userMainData?.userInfos.firstName}
            </span>
          </h1>
          <p className={profileCSS.welcomeGreetings}>
            Félicitations ! Vous avez explosé vos objectifs hier 👏{" "}
          </p>
        </div>

        {profileToDisplay && (
          <button
            className={profileCSS.changeProfile}
            onClick={() => setUserId(profileToDisplay.id)}
          >
            Voir profil {profileToDisplay.name}
          </button>
        )}
      </div>
      <div className={profileCSS.container}>
        <main className={profileCSS.charts}>
          {userDailyActivities && (
            <section id="daily-activity" className={profileCSS.dailyActivity}>
              <BarChart data={userDailyActivities} />
            </section>
          )}

          <div className={profileCSS.chartsBottom}>
            {userAverageSessions && (
              <section id="session-duration" className={profileCSS.chartBottom}>
                <SessionDurationChart data={userAverageSessions} />
              </section>
            )}
            {userPerformance && (
              <section id="performance" className={profileCSS.chartBottom}>
                <RadarChart performances={userPerformance} />
              </section>
            )}
            {userMainData && (
              <section id="score" className={profileCSS.chartBottom}>
                <RadialChart score={userMainData.score} />
              </section>
            )}
          </div>
        </main>
        {userMainData && <Diet data={userMainData.keyData} />}
      </div>
    </>
  )
}
