import FoodIcon from "./FoodIcon.jsx"
import energyIcon from "../assets/images/stats/energy.svg"
import chickenIcon from "../assets/images/stats/chicken.svg"
import appleIcon from "../assets/images/stats/apple.svg"
import cheesburger from "../assets/images/stats/cheeseburger.svg"

import styled from "styled-components"

const Container = styled.aside`
  width: 23%;
`

const Foods = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  // row-gap: 20px;
`

const FoodItem = styled.li`
  flex-grow: 1;
  width: 100%;
`

export default function Diet() {
  const icons = [
    {
      path: energyIcon,
      alt: "Calories",
      style: {
        icon: {
          width: "16px",
          aspectRatio: "16/20",
        },
        container: {
          fill: "#FF0000",
        },
      },
    },
    {
      path: chickenIcon,
      alt: "Protéines",
      style: {
        icon: {
          width: "19px",
          aspectRatio: "1/1",
        },
        container: {
          fill: "#4AB8FF1A",
        },
      },
    },
    {
      path: appleIcon,
      alt: "Glucides",
      style: {
        icon: {
          width: "17px",
          aspectRatio: "17/20",
        },
        container: {
          fill: "#F9CE23",
        },
      },
    },
    {
      path: cheesburger,
      alt: "Lipides",
      style: {
        icon: {
          width: "20px",
          aspectRatio: "1/1",
        },
        container: {
          fill: "#FD51811A",
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
              <FoodIcon img={icon.path} style={icon.style} />
            </FoodItem>
          ))}
        </Foods>
      </Container>
    </>
  )
}
