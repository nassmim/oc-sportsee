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
  const score = (USER_MAIN_DATA[0].todayScore || USER_MAIN_DATA[0].score) * 100

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
              <RadialChart score={score} />
            </section>
          </div>
        </main>
        <Diet data={USER_MAIN_DATA[0].keyData} />
      </div>
    </>
  )
}
