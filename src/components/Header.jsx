import { Link, NavLink } from "react-router-dom"

import headerCSS from "../css/header.module.css"
import logo from "../assets/logo.png"

export default function Header() {
  const isNavLinkActive = (isActive, isPending) => {
    return isActive ? headerCSS.activeLink : ""
  }

  return (
    <>
      <header className={headerCSS.header}>
        <Link to="/" className={headerCSS.logoContainer}>
          <img src={logo} className={headerCSS.logo} alt="Sportsee" />
        </Link>

        <nav className={headerCSS.menu}>
          <ul className={headerCSS.links}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isNavLinkActive(isActive, isPending) + " " + headerCSS.link
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive, isPending }) =>
                isNavLinkActive(isActive, isPending) + " " + headerCSS.link
              }
            >
              Profil
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                isNavLinkActive(isActive, isPending) + " " + headerCSS.link
              }
            >
              Réglage
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive, isPending }) =>
                isNavLinkActive(isActive, isPending) + " " + headerCSS.link
              }
            >
              Communauté
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  )
}
