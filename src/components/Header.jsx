import { Link, NavLink } from "react-router-dom"

import headerCSS from "../css/header.module.css"
import logo from "../assets/images/logos/logo.png"

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
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isNavLinkActive(isActive, isPending) + " " + headerCSS.link
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive, isPending }) =>
                  isNavLinkActive(isActive, isPending) + " " + headerCSS.link
                }
              >
                Profil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive, isPending }) =>
                  isNavLinkActive(isActive, isPending) + " " + headerCSS.link
                }
              >
                Réglage
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive, isPending }) =>
                  isNavLinkActive(isActive, isPending) + " " + headerCSS.link
                }
              >
                Communauté
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
