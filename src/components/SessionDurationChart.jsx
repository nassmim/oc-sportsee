import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

/**
 *
 * @param {{ day: Number, sessionLength: Number }[]} data
 * @returns { ReactComponent } line chart representing the user activity session length per day
 */
export default function SessionDurationChart({ data }) {
  const [leftLabel, setLeftLabel] = useState(6)
  const [isAreaSelected, setIsAreaSelected] = useState(false)
  const [avgDuration, setAvgDuration] = useState(0)

  const days = ["L", "M", "M", "J", "V", "S", "D"]

  /**
   *
   * @param { {x: Number, y: Number, stroke: String, payload: {}} } tickObject representing the
   * chart x-axis tick properties at a specific data point
   * @returns { svgElement } corresponding to the x-axis tick with custom style
   */
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

  /**
   *
   * @param { Boolean } active
   * @param { RechartsElement } payload containing information on the chart specific data point
   * where the mouse is the closest
   * @param {} label not used
   * @returns { DomElement } corresponding to the chart data point tooltip
   */
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

  /**
   *
   * @returns { DomElement } corresponding to the chart legend
   */
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

  /**
   *
   * @param { Number } x representing the starting position of the chart selection area relative to
   * the chart container
   * @returns { DomElement } corresponding to area highlighted in the chart with a custom style
   */
  const ReferenceAreaCustom = ({ x }) => {
    return (
      <g>
        <rect x={x} width={"31%"} height={"100%"} opacity={0.5}></rect>
        {avgDuration && (
          <text x={x + 10} y="50%" fontSize="10" fill="#fff">
            {avgDuration} mn
          </text>
        )}
      </g>
    )
  }

  /**
   *
   * @param { RechartsElement } activeLabel corresponding to the chart data point that is active
   * @returns { Void } none
   */
  const activateSelection = (activeLabel) => {
    // This check to ensure the user click is within the current selected area.
    if (activeLabel >= leftLabel && activeLabel <= leftLabel + 2) {
      setIsAreaSelected(true)
    }
  }

  /**
   *
   * @param { RechartsElement || DomElement } e
   * @returns { Void } none
   */
  const stopAreaSelection = (e) => {
    if (!isAreaSelected) return
    else {
      // Since area has been previously selected with a mouse down and mouse is now up
      // it means we need to update its new position
      setIsAreaSelected(false)
      setLeftLabel(e?.activeLabel)
    }
  }

  // This function used to calculate the average session duration based on the user selection
  useEffect(() => {
    if (leftLabel === 7) {
      // Area must not go outside the graph, so if we are at the last data point
      // we reset the area position
      setAvgDuration(null)
      return
    }

    // Retrieves the data points within the selection (selection width fixed and corresponds to 2 data points)
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

SessionDurationChart.propTypes = {
  data: PropTypes.array,
}
