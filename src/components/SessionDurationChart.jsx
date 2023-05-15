import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Rectangle,
  ReferenceArea,
} from "recharts"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 258/263;
  background: #ff0000;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
`

export default function SessionDurationChart({ data }) {
  const [leftLabel, setLeftLabel] = useState(6)
  const [isAreaSelected, setIsAreaSelected] = useState(false)
  const [avgDuration, setAvgDuration] = useState(0)

  const days = ["L", "M", "M", "J", "V", "S", "D"]

  const XAxisTickCustom = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          dy={16}
          textAnchor="end"
          fill="#fff"
          fontSize={12}
          fontWeight={500}
          opacity={0.5}
        >
          {days[payload.value % 7 === 0 ? 6 : (payload.value % 7) - 1]}
        </text>
      </g>
    )
  }

  const renderTooltipCustom = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            fontSize: "8px",
            padding: 7,
          }}
        >
          <p>{`${payload[0].value} min`}</p>
        </div>
      )
    }

    return null
  }

  const TooltipCursorCustom = ({ points, width, height }) => {
    return (
      <Rectangle
        fill="#000"
        x={points[0].x}
        y={0}
        height={300}
        width={79}
        opacity={0.7}
      />
    )
  }

  const LegendTextCustom = () => {
    return (
      <div
        style={{
          width: "57%",
          fontSize: "15px",
          fontWeight: 500,
          color: "#fff",
          paddingLeft: 32,
          marginRight: 15,
          opacity: 0.5,
          lineHeight: "24px",
        }}
      >
        Durée moyenne des sessions
      </div>
    )
  }

  const ReferenceAreaCustom = (props) => {
    return (
      <g>
        <rect x={props.x} width={"31%"} height={"100%"} opacity={0.5}></rect>
        {avgDuration && (
          <text x={props.x + 10} y="50%" fontSize="10" fill="#fff">
            {avgDuration} mn
          </text>
        )}
      </g>
    )
  }

  const activateSelection = (activeLabel) => {
    if (activeLabel >= leftLabel && activeLabel <= leftLabel + 2) {
      setIsAreaSelected(true)
    }
  }

  const stopAreaSelection = (e) => {
    if (!isAreaSelected) return
    else {
      setIsAreaSelected(false)
      setLeftLabel(e?.activeLabel)
    }
  }

  useEffect(() => {
    if (leftLabel === 7) {
      setAvgDuration(null)
      return
    }

    const sessionsSelected = data.slice(leftLabel - 1, leftLabel + 2)

    const totalDuration = sessionsSelected.reduce(
      (totalDuration, session) => totalDuration + session.sessionLength,
      0
    )
    const average = Math.ceil(totalDuration / sessionsSelected.length)
    setAvgDuration(average)
  }, [leftLabel])

  return (
    <Container>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ bottom: 30, top: 30 }}
          onMouseDown={(e) =>
            e?.activeLabel && activateSelection(e.activeLabel)
          }
          onMouseMove={(e) => isAreaSelected && setLeftLabel(e?.activeLabel)}
          onMouseUp={(e) => stopAreaSelection(e)}
        >
          <XAxis
            dataKey="day"
            type="category"
            tick={<XAxisTickCustom />}
            axisLine={false}
            tickLine={false}
            padding={{ left: 15, right: 15 }}
          />
          <YAxis hide={true} />
          <Tooltip
            axisLine={false}
            content={renderTooltipCustom}
            cursor={false}
            labelStyle={{ boxShadow: 30 }}
          />
          <Legend
            verticalAlign="top"
            align="left"
            content={<LegendTextCustom />}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#fff"
            strokeWidth={2}
            opacity={0.5}
            dot={false}
            activeDot={{ strokeWidth: 1, boxShadow: "20px 10px 5px" }}
          />
          <ReferenceArea
            x1={leftLabel}
            x2={Math.min(7, leftLabel + 2)}
            shape={<ReferenceAreaCustom />}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}
