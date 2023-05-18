import Sidebar from "./Sidebar.jsx"
import mainContainerCSS from "../css/mainContainer.module.css"
import { Outlet } from "react-router-dom"

/**
 *
 * @returns { ReactComponent } used to keep all pages within the same page disposition
 * delimited by header and sidebar
 */
export default function MainContainer() {
  return (
    <>
      <div className={mainContainerCSS.container}>
        <Sidebar />
        <div className={mainContainerCSS.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
