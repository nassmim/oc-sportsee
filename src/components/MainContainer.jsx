import Sidebar from "./Sidebar.jsx"
import mainContainerCSS from "../css/mainContainer.module.css"
import { Outlet } from "react-router-dom"

export default function MainContainer() {
  return (
    <>
      <main className={mainContainerCSS.main}>
        <Sidebar />
        <Outlet />
      </main>
    </>
  )
}
