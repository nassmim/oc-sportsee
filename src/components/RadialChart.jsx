import PropTypes from "prop-types"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from "recharts"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 258/263;
  background: #fbfbfb;
  border-radius: 5px;
  overflow: hidden;
`
const PerformanceResults = styled.p`
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  font-size: 26px;
  font-weight: 700;
  line-height: 26px;
  text-align: center;
  z-index: 2;

  & span {
    font-size: 16px;
    font-weight: 500;
    color: #74798c;
  }
`

const ResponsiveContainerStyled = styled(ResponsiveContainer)`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    width: 62%;
    aspect-ratio: 1/1;
    background-color: #fff;
    border-radius: 50%;
  }
`
/**
 *
 * @param { Number } score
 * @returns { ReactComponent } radial bar chart corresponding to the user objectives progression
 */
export default function RadialChart({ score }) {
  const chartData = [
    {
      score: score,
      fill: "#FF0000",
      cornerRadius: "5",
    },
  ]

  // Starting position of the arc is at 90°, so we must add it to derive the end position
  const endAngle = 90 + (score * 360) / 100

  const renderLegendCustom = (props) => {
    return (
      <p
        style={{
          position: "absolute",
          fontSize: "15px",
          fontWeight: 500,
          padding: "10px 0px 10px 20px",
        }}
      >
        Score
      </p>
    )
  }

  return (
    <Container>
      <PerformanceResults>
        {score}
        <br />
        <span> % de votre objectif</span>
      </PerformanceResults>
      <ResponsiveContainerStyled>
        <RadialBarChart
          data={chartData}
          innerRadius="69%"
          startAngle={90}
          endAngle={endAngle}
          barSize={10}
        >
          <RadialBar
            label={false}
            background={true}
            clockWise={true}
            dataKey="score"
          />
          <Legend content={renderLegendCustom} verticalAlign="top" />
        </RadialBarChart>
      </ResponsiveContainerStyled>
    </Container>
  )
}

RadialChart.propTypes = {
  score: PropTypes.number,
}
