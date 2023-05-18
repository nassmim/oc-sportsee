import PropTypes from "prop-types"

import activityIconCSS from "../css/activityIcon.module.css"
export default function ActivityIcon({ img, alt, style }) {
  return (
    <>
      <div className={activityIconCSS.container}>
        <img src={img} alt={alt} style={style} />
      </div>
    </>
  )
}

ActivityIcon.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
}
