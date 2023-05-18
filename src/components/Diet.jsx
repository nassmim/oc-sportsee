import PropTypes from "prop-types"
import FoodIcon from "./FoodIcon.jsx"
import energyIcon from "../assets/images/stats/energy.svg"
import chickenIcon from "../assets/images/stats/chicken.svg"
import appleIcon from "../assets/images/stats/apple.svg"
import cheesburger from "../assets/images/stats/cheeseburger.svg"

import styled from "styled-components"

const Container = styled.aside`
  width: 25%;
  padding-left: 2.5%;
`

const Foods = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const FoodItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
`

/**
 *
 * @param {{calorieCount: Number, proteinCount: Number, carbohydrateCount: Number
 * , lipidCount: Number }} data
 * @returns { ReactComponent } representing the right sidebar with the user key diet stats
 */
export default function Diet({ data }) {
  const icons = [
    {
      data: data.calorieCount,
      units: "kCal",
      path: energyIcon,
      alt: "Calories",
      style: {
        icon: {
          width: "16px",
          aspectRatio: "16/20",
        },
        container: {
          backgroundColor: "#fbeaeb",
        },
      },
    },
    {
      data: data.proteinCount,
      units: "kCal",
      path: chickenIcon,
      alt: "Protéines",
      style: {
        icon: {
          width: "19px",
          aspectRatio: "1/1",
        },
        container: {
          backgroundColor: "#4AB8FF1A",
        },
      },
    },
    {
      data: data.carbohydrateCount,
      units: "kCal",
      path: appleIcon,
      alt: "Glucides",
      style: {
        icon: {
          width: "17px",
          aspectRatio: "17/20",
        },
        container: {
          backgroundColor: "#FBF6E5",
        },
      },
    },
    {
      data: data.lipidCount,
      units: "kCal",
      path: cheesburger,
      alt: "Lipides",
      style: {
        icon: {
          width: "20px",
          aspectRatio: "1/1",
        },
        container: {
          backgroundColor: "#fbeaeb",
        },
      },
    },
  ]

  return (
    <>
      <Container>
        <Foods>
          {icons.map((icon, index) => (
            <FoodItem key={index}>
              <FoodIcon icon={icon} />
            </FoodItem>
          ))}
        </Foods>
      </Container>
    </>
  )
}

Diet.propTypes = {
  data: PropTypes.object,
}
