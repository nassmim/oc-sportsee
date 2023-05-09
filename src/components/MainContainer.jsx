import Sidebar from "./Sidebar.jsx"
import mainContainerCSS from "../css/mainContainer.module.css"
import { Outlet } from "react-router-dom"

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
