import PropTypes from "prop-types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 835/320;
  background: #fbfbfb;
  border-radius: 5px;
  overflow: hidden;
  padding: 30px;
  padding-bottom: 50px;
`
const Title = styled.h2`
  position: absolute;
  top: 22px;
  transform: translateY(50%);
  font-size: 15px;
  font-weight: 500;
  color: #20253a;
`

/**
 *
 * @param { {day: String, kilogram: Number, calories: Number }[] } data Array representing a session f
 * @returns { ReactComponent } representing a Bar chart
 */
export default function BarChartCustom({ data }) {
  // Chart x-axis must start at one, so we increment position by 1 for each day
  const dataForChart = data.map((session, index) => {
    return {
      ...session,
      dayNumber: index + 1,
    }
  })

  /**
   *
   * @param {String} value
   * @param {} entry Not used
   * @returns { DomElement } corresponding to the chart legend
   */
  const LegendTextCustom = (value, entry) => {
    const legendText = value === "kilogram" ? "Poids (kg)" : "Calories (kCal)"

    return (
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#74798C",
          paddingLeft: 10,
          marginRight: 15,
        }}
      >
        {legendText}
      </span>
    )
  }

  /**
   *
   * @param {Boolean} active
   * @param {RechartsElement} payload containing information on the chart data point
   * where the mouse is the closest
   * @param {} label not used
   * @returns { DomElement } corresponding to the chart data point tooltip
   */
  const renderTooltipCustom = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            zIndex: 2,
            backgroundColor: "#E60000",
            fontSize: "10px",
            color: "#fff",
            padding: "10px",
          }}
        >
          <p style={{ paddingBottom: 25 }}>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}Kcal`}</p>
        </div>
      )
    }

    return null
  }

  /**
   *
   * @param { Number } x representing the horizontal position of the mouse relative to parent component
   * @param { Number } y representing the vertical position of the mouse relative to parent component
   * @param { Number } height representing the height of the tooltip wrapper
   * @returns { DomElement } corresponding to the chart data point tooltip
   */
  const TooltipCursorCustom = ({ x, y, height }) => {
    const widthCustom = 56
    // value below been chosen so that the wrapper always surrounds equally the two bars
    const translateX = 21
    return (
      <Rectangle
        fill="#C4C4C480"
        x={x + translateX}
        y={y}
        width={widthCustom}
        height={height}
      />
    )
  }

  return (
    <Container>
      <Title>Activité quotidienne</Title>
      <ResponsiveContainer>
        <BarChart
          data={dataForChart}
          barSize={7}
          margin={{
            right: 10,
          }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dayNumber"
            type="number"
            domain={[1, dataForChart.length]}
            tickCount={dataForChart.length}
            axisLine={{
              stroke: "#DEDEDE",
              strokeWidth: "1px",
            }}
            tickSize={0}
            tick={{ fill: "#9B9EAC", fontSize: "14px", fontWeight: 500 }}
            dy={15}
            padding={{ left: 11, right: 11 }}
          />
          <YAxis
            yAxisId="kilogram"
            type="number"
            domain={([dataMin, dataMax]) => [
              Math.max(0, dataMin - 5),
              dataMax + 5,
            ]}
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9B9EAC", fontSize: "14px", fontWeight: 500 }}
            dx={40}
          />
          <YAxis yAxisId="calories" type="number" scale={"sqrt"} hide={true} />
          <Tooltip
            content={renderTooltipCustom}
            cursor={<TooltipCursorCustom />}
            offset={20}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconSize={8}
            iconType="circle"
            formatter={LegendTextCustom}
            wrapperStyle={{ paddingBottom: 50 }}
          />

          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

BarChartCustom.propTypes = {
  data: PropTypes.array,
}
