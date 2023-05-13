import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 258px;
  aspect-ratio: 258/263;
  background: #fbfbfb;
  border-radius: 5px;
  overflow: hidden;

  &::before {
  }
`
const Title = styled.h2`
  font-size: 15px;
  font-weight: 500;
  padding: 11% 0px 3px 9%;
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
  transform: translateY(-20%);
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

export default function RadialChart({ score }) {
  const chartData = [
    {
      score: score,
      fill: "#FF0000",
      cornerRadius: "5",
    },
  ]

  const endAngle = 90 + (score * 360) / 100

  return (
    <Container>
      <Title>Score</Title>
      <PerformanceResults>
        {score}
        <br />
        <span> % de votre objectif</span>
      </PerformanceResults>
      <ResponsiveContainerStyled>
        <RadialBarChart
          data={chartData}
          width={800}
          height={350}
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
        </RadialBarChart>
      </ResponsiveContainerStyled>
    </Container>
  )
}
