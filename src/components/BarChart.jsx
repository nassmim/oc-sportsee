import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scalePoint,
  scaleLinear,
  max,
  axisLeft,
} from "d3"

import { useEffect, useRef } from "react"

import sessionDurationCSS from "../css/sessionDuration.module.css"

export default function BarChart({ data }) {
  const sessionDurationChartRef = useRef()

  const getSizeAttribute = (styleAttributes, attribute) => {
    const attributeValue = styleAttributes.getPropertyValue(attribute)

    const attributeValueInt = parseInt(
      attributeValue.substring(0, attributeValue.length - 2)
    )
    return attributeValueInt
  }

  useEffect(() => {
    const svg = select(sessionDurationChartRef.current)

    const sessionDurationChartStyle = window.getComputedStyle(
      sessionDurationChartRef.current
    )

    const sessionDurationChartHeight = getSizeAttribute(
      sessionDurationChartStyle,
      "height"
    )
    const sessionDurationChartWidth = getSizeAttribute(
      sessionDurationChartStyle,
      "width"
    )

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 260])

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([sessionDurationChartHeight, 0])

    const days = ["L", "M", "M", "J", "V", "S", "D"]

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickSizeInner(0)
      .tickSizeOuter(0)
      .tickFormat((index) => days[index])

    svg
      .select("." + sessionDurationCSS.xAxis)
      .style("transform", `translateY(${sessionDurationChartHeight}px)`)
      .call(xAxis)

    svg
      .select("." + sessionDurationCSS.xAxis)
      .select("path")
      .style("display", "none")

    const yAxis = axisLeft(yScale)
    svg.select("." + sessionDurationCSS.yAxis).call(yAxis)

    const sessionDurationChart = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", sessionDurationChart)
      .attr("fill", "none")
      .attr("stroke", "red")
  }, [])

  return (
    <>
      <svg ref={sessionDurationChartRef} className={sessionDurationCSS.chart}>
        <g className={sessionDurationCSS.xAxis} />
        <g className={sessionDurationCSS.yAxis} />
      </svg>
    </>
  )
}
