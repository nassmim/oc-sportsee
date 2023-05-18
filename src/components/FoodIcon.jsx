import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 10%;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 258/124;
  max-width: 258px;
  padding: 2% 30px;
  border-radius: 5px;
  background-color: #fbfbfb;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  aspect-ratio: 1/1;
  border-radius: 5px;
`

const DataContainer = styled.p`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  & span.count {
    font-size: 20px;
    font-weight: bold;
    color: #282d30;
  }

  & span.type {
    font-size: 14px;
    color: #74798c;
  }
`

/**
 *
 * @param {Object} icon corresponding to one type of diet statistic
 * @returns { ReactComponent } reusable and representing a user key diet stat
 */
export default function FoodIcon({ icon }) {
  const { data, units, path, style, alt } = icon

  return (
    <Container>
      <IconContainer style={style.container}>
        <img src={path} alt={alt} style={style.icon} />
      </IconContainer>
      <DataContainer>
        <span className="count">
          {data}
          {units}
        </span>
        <span className="type">{alt}</span>
      </DataContainer>
    </Container>
  )
}

FoodIcon.propTypes = {
  icon: PropTypes.object,
}
