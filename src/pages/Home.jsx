import RadialChart from "../components/RadialChart.jsx"
import SessionDurationChart from "../components/SessionDurationChart.jsx"
import homeCSS from "../css/home.module.css"
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/data.js"

export default function Home() {
  const sessionDurations = USER_AVERAGE_SESSIONS[0].sessions.map(
    (session) => session.sessionLength
  )
  const score = (USER_MAIN_DATA[0].todayScore || USER_MAIN_DATA[0].score) * 100

  return (
    <>
      <div className={homeCSS.welcome}>
        <h1 className={homeCSS.welcomeTitle}>
          Bonjour <span className={homeCSS.username}>Thomas</span>
        </h1>
        <p className={homeCSS.welcomeGreetings}>
          Félicitations ! Vous avez explosé vos objectifs hier 👏{" "}
        </p>
      </div>
      <div className={homeCSS.container}>
        <main className={homeCSS.charts}>
          <section className={homeCSS.dailyActivity}>
            <SessionDurationChart data={sessionDurations} />
          </section>
          <section className={homeCSS.dailyActivity}>
            <SessionDurationChart data={sessionDurations} />
          </section>
          <section className={homeCSS.dailyActivity}>
            <SessionDurationChart data={sessionDurations} />
          </section>
          <section className={homeCSS.dailyActivity}>
            <RadialChart score={score} />
          </section>
        </main>
        <aside className={homeCSS.macroStats}>MACROSTATS</aside>
      </div>
    </>
  )
}
