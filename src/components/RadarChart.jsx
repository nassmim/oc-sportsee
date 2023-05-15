import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Text,
} from "recharts"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 258/263;
  background: #282d30;
  border-radius: 5px;
  overflow: hidden;
`

export default function RadarChartCustom({ performances }) {
  function PolarAngleAxisCustom({ payload, x, y, cx, cy, ...rest }) {
    let yCustom = y

    if (payload.coordinate === 90) yCustom = y - 10
    else if (payload.coordinate === -90) yCustom = y + 10

    return (
      <Text
        {...rest}
        verticalAnchor="middle"
        y={yCustom}
        x={x}
        fill="#fff"
        fontSize={10}
        fontWeight={500}
      >
        {payload.value}
      </Text>
    )
  }

  const translations = {
    cardio: "Cardio",
    energy: "Energie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  }
  const performancesNumber = performances.data.length
  const chartData = performances.data.reduce((listPerfs, perf, index) => {
    const data = {
      kind: translations[performances.kind[perf.kind]],
      value: perf.value,
    }

    listPerfs[performancesNumber - perf.kind] = data

    return listPerfs
  }, Array(performancesNumber))

  return (
    <Container>
      <ResponsiveContainer>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="70%"
          data={chartData}
          Z
          margin={{
            top: 20,
            bottom: 20,
          }}
        >
          <PolarGrid color="black" radialLines={false} fill="black" />
          <PolarAngleAxis dataKey="kind" tick={PolarAngleAxisCustom} />
          <PolarRadiusAxis
            type="number"
            tickCount={5}
            axisLine={false}
            tick={false}
          />
          <Radar
            name="Mike"
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Container>
  )
}
