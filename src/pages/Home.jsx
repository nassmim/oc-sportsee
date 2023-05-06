import homeCSS from "../css/home.module.css"
export default function Home() {
  return (
    <>
      <h1 className={homeCSS.welcomeTitle}>
        Bonjour <span className={homeCSS.username}>Thomas</span>
      </h1>
      <p className={homeCSS.greetings}>
        Félicitations ! Vous avez explosé vos objectifs hier 👏{" "}
      </p>
    </>
  )
}
