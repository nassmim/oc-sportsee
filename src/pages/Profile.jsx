import { useEffect, useState } from "react"
import userAPI from "../api/user.js"

import Diet from "../components/Diet.jsx"
import BarChart from "../components/BarChart.jsx"
import SessionDurationChart from "../components/SessionDurationChart.jsx"
import RadarChart from "../components/RadarChart.jsx"
import RadialChart from "../components/RadialChart.jsx"
import profileCSS from "../css/profile.module.css"

import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/data.js"

export default function Profile() {
  const [userId, setUserId] = useState(12)
  const [userMainData, setUserMainData] = useState({})

  useEffect(() => {
    const getUserMainData = async () => {
      let userData = {}
      try {
        userData = await userAPI.getUserMainData(userId)
      } catch (err) {
        console.log(err)
        return
      }

      userData = userData.data

      const score = (userData.todayScore || userData.score) * 100
      const newUserMainData = {
        ...userData,
        score: score,
      }

      setUserMainData(newUserMainData)
    }

    getUserMainData()
  }, [userId])

  return (
    <>
      <div className={profileCSS.welcome}>
        <h1 className={profileCSS.welcomeTitle}>
          Bonjour <span className={profileCSS.username}>Thomas</span>
        </h1>
        <p className={profileCSS.welcomeGreetings}>
          Félicitations ! Vous avez explosé vos objectifs hier 👏{" "}
        </p>
      </div>
      <div className={profileCSS.container}>
        <main className={profileCSS.charts}>
          <section id="daily-activity" className={profileCSS.dailyActivity}>
            <BarChart data={USER_ACTIVITY[0]} />
          </section>

          <div className={profileCSS.chartsBottom}>
            <section id="session-duration" className={profileCSS.chartBottom}>
              <SessionDurationChart data={USER_AVERAGE_SESSIONS[0].sessions} />
            </section>
            <section id="performance" className={profileCSS.chartBottom}>
              <RadarChart performances={USER_PERFORMANCE[0]} />
            </section>
            <section id="score" className={profileCSS.chartBottom}>
              <RadialChart score={userMainData.score} />
            </section>
          </div>
        </main>
        <Diet data={USER_MAIN_DATA[0].keyData} />
      </div>
    </>
  )
}
