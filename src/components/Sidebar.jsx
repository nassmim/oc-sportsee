import { Link } from "react-router-dom"
import sidebarCSS from "../css/sidebar.module.css"
import ActivityIcon from "./ActivityIcon.jsx"
import dailyActivityIcon from "../assets/images/activities/daily_activity.png"
import sessionLengthIcon from "../assets/images/activities/session_length.png"
import statsIcon from "../assets/images/activities/stats.png"
import scoreIcon from "../assets/images/activities/score.png"

export default function Sidebar() {
  const icons = [
    {
      path: dailyActivityIcon,
      id: "daily-activity",
      alt: "Yoga",
      style: {
        width: "50%",
        aspectRatio: "36/32",
      },
    },
    {
      path: sessionLengthIcon,
      id: "session-duration",
      alt: "Swimming",
      style: {
        width: "50%",
        aspectRatio: "1/1",
      },
    },
    {
      path: statsIcon,
      id: "performance",
      alt: "Cycling",
      style: {
        width: "59%",
        aspectRatio: "38/32",
      },
    },
    {
      path: scoreIcon,
      id: "score",
      alt: "fitness",
      style: {
        width: "50%",
        aspectRatio: "1/1",
      },
    },
  ]

  return (
    <>
      <aside className={sidebarCSS.sidebar}>
        <nav className={sidebarCSS.menu}>
          <ul className={sidebarCSS.menuItems}>
            {icons.map((icon, index) => (
              <li key={icon.id} className={sidebarCSS.menuItem}>
                <Link to={`/profile#${icon.id}`} className={sidebarCSS.link}>
                  <ActivityIcon img={icon.path} style={icon.style} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <small className={sidebarCSS.copyright}>
          Copyrights, SportSee 2020
        </small>
      </aside>
    </>
  )
}
