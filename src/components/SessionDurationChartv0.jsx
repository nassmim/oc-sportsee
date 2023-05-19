// import {
//   select,
//   line,
//   curveCardinal,
//   axisBottom,
//   scalePoint,
//   scaleLinear,
//   max,
//   axisLeft,
//   brushX,
//   selectAll,
//   pointer,
// } from "d3"

// import { useEffect, useRef, useState } from "react"
// import ResizeObserver from "resize-observer-polyfill"

// import sessionDurationCSS from "../css/sessionDuration.module.css"

// const useResizeObserver = (refToElement) => {
//   const [chartDimensions, setDimensions] = useState(null)

//   useEffect(() => {
//     const observedElement = refToElement.current
//     const resizeObserver = new ResizeObserver((entries) => {
//       entries.forEach((entry) => {
//         setDimensions(entry.contentRect)
//       })
//     })

//     resizeObserver.observe(observedElement)

//     return () => {
//       resizeObserver.unobserve(observedElement)
//     }
//   }, [refToElement])

//   return chartDimensions
// }

// const usePrevious = (prevValue) => {
//   const refToElement = useRef()
//   useEffect(() => {
//     refToElement.current = prevValue
//   })

//   return refToElement.current
// }

// export default function SessionDurationChart({ data }) {
//   const containerRef = useRef()
//   const chartRef = useRef()
//   const chartContainerRef = useRef()
//   const [brushSelection, setBrushSelection] = useState([
//     data.length - 2.5,
//     data.length - 1,
//   ])

//   const previousBrushSelection = usePrevious(brushSelection)

//   const totalHeight = useResizeObserver(containerRef)
//   const chartDimensions = useResizeObserver(chartContainerRef)
//   console.log(totalHeight)
//   console.log(chartDimensions)
//   useEffect(() => {
//     const container = select(containerRef.current)
//     const svg = select(chartRef.current)

//     const { height: containerHeight } =
//       totalHeight || chartContainerRef.current.getBoundingClientRect()

//     const { width: chartWidth, height: chartHeight } =
//       chartDimensions || chartContainerRef.current.getBoundingClientRect()

//     const xScale = scaleLinear()
//       .domain([0, data.length - 1])
//       .range([15, chartWidth - 15])

//     const yScale = scaleLinear()
//       .domain([0, max(data)])
//       .range([chartHeight, 0])

//     const chartGenerator = line()
//       .x((value, index) => xScale(index))
//       .y(yScale)
//       .curve(curveCardinal)

//     const brushGenerator = brushX()
//       .extent([
//         [0, 0],
//         [chartWidth, containerHeight * 2],
//       ])
//       .on("start brush end", (e) => {
//         const indexOnSelection = e.selection?.map(xScale.invert)
//         setBrushSelection(indexOnSelection)

//         // const indexFromMouse = Math.ceil(indexOnSelection[0])
//         // const positionX =
//         //   xScale(indexFromMouse) - 30 - (indexFromMouse >= 5 ? 20 : 0)

//         // const valueFromMouse = Math.round(yScale.invert(data[indexFromMouse]))
//         // const positionY =
//         //   chartHeight +
//         //   chartTitleHeight -
//         //   chartTitlePadding[0].replace("px", "") -
//         //   chartTitlePadding[0].replace("px", "") -
//         //   yScale(valueFromMouse) -
//         //   10

//         // tooltip
//         //   .style("left", positionX + "px")
//         //   .style("top", positionY + "px")
//         //   .style("visibility", "visible")

//         if (indexOnSelection[0] === indexOnSelection[1]) {
//           svg
//             .select(".brush")
//             .call(brushGenerator)
//             .call(
//               brushGenerator.move,
//               [4.3, 7].map((index) => xScale(index))
//             )
//         }
//       })

//     svg
//       .style("max-height", "130px")
//       .selectAll(".line")
//       .data([data])
//       .join("path")
//       .attr("class", "line")
//       .attr("d", chartGenerator)
//       .attr("fill", "none")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", "2px")
//       .style("opacity", 0.7)
//       .on("mouseenter", (e, values) => {
//         const index = svg.selectAll(".line-dot").nodes()[0]
//         // svg
//         //   .selectAll(".tooltip")
//         //   .data([values])
//         //   .join("text")
//         //   .attr("class", "tooltip")
//         //   .text(values[index])
//         //   .attr("x", xScale(index))
//         // // .attr("y", yScale)
//       })

//     const chartTitleElement = container.select("." + sessionDurationCSS.title)

//     chartTitleElement
//       .style("transform", "translateX(8%)")
//       .style("font-size", "15px")
//       .style("color", "#fff")
//       .style("font-weight", 500)

//     const chartTitleHeight = chartTitleElement
//       .node()
//       ?.getBoundingClientRect().height
//     const chartTitlePadding = chartTitleElement.style("padding").split(" ")
//     // svg.style(
//     //   "transform",
//     //   `translateY(${35 + chartTitleHeight - chartTitlePadding[0]}px)`
//     // )

//     const tooltip = select(".tooltip")

//     if (!tooltip.node()) {
//       select(".chart-container")
//         .append("div")
//         .attr("class", "tooltip")
//         .text("68 min")
//         .style("position", "absolute")
//         .style("visibility", "hidden")
//         .style("background-color", "#fff")
//         .style("border", "solid")
//         .style("border-width", "1px")
//         .style("padding", "7px")
//         .style("font-size", "8px")
//     }

//     // svg.on("mousemove", function (e) {
//     //   if (!tooltip) return

//     //   const indexFromMouse = Math.round(xScale.invert(pointer(e)[0]))
//     //   const positionX = xScale(indexFromMouse) - (indexFromMouse >= 5 ? 20 : 0)

//     //   const valueFromMouse = Math.round(yScale.invert(data[indexFromMouse]))
//     //   const positionY =
//     //     chartHeight +
//     //     chartTitleHeight -
//     //     chartTitlePadding[0].replace("px", "") -
//     //     yScale(valueFromMouse) -
//     //     10

//     //   return tooltip
//     //     .style("left", positionX + "px")
//     //     .style("top", positionY + "px")
//     //     .style("visibility", "visible")
//     // })

//     // svg.on("mouseout", function () {
//     //   if (!tooltip) return
//     //   return tooltip.style("visibility", "hidden")
//     // })

//     // svg
//     //   .selectAll(".tooltip")
//     //   .data(data)
//     //   .join("text")
//     //   .attr("class", "tooltip")
//     //   .text((value, index) =>
//     //     index === Math.ceil(brushSelection[0]) ? value : ""
//     //   )
//     //   .attr("x", (value, index) => xScale(index))
//     //   // .attr("y", yScale)
//     //   .style("fill", "#fff")
//     //   .style("font-size", "8px")
//     //   .style("background", "#fff")

//     svg
//       .selectAll(".line-dot")
//       .data(data)
//       .join("circle")
//       .attr("class", "line-dot")
//       .attr("fill", "#fff")
//       .attr("r", (value, index) => {
//         if (!brushSelection) return 0
//         if (index - 1 >= brushSelection[0]) return 0
//         const dotToDisplay = index === Math.ceil(brushSelection[0])
//         return dotToDisplay ? 4 : 0
//       })
//       .attr("cx", (value, index) => xScale(index))
//       .attr("cy", yScale)

//     const lineDotDisplayedPositions = [
//       select('.line-dot[r="4"]').attr("cx"),
//       select('.line-dot[r="4"]').attr("cy"),
//     ]

//     const linedotIndex = xScale.invert(lineDotDisplayedPositions[0])
//     const positionLeft =
//       lineDotDisplayedPositions[0] - (linedotIndex > 5 ? 45 : 0)

//     tooltip
//       .style("left", positionLeft + "px")
//       .style("top", parseInt(lineDotDisplayedPositions[1]) + 30 + "px")
//       .style("visibility", "visible")

//     if (brushSelection === previousBrushSelection) {
//       svg
//         .select(".brush")
//         .call(brushGenerator)
//         .call(
//           brushGenerator.move,
//           [4.3, 7].map((index) => xScale(index))
//         )

//       svg
//         .select(".brush")
//         .style("transform", `translateY(${-chartHeight}px)`)
//         .select("rect.selection")
//         .style("fill", "#000")
//         .style("opacity", 0.7)
//         .style("stroke", "transparent")
//     }

//     const days = ["L", "M", "M", "J", "V", "S", "D"]

//     const xAxis = axisBottom(xScale)
//       .ticks(data.length)
//       .tickSize(0)
//       .tickFormat((index) => days[index])

//     const chartPathHeight = svg
//       .select(".line")
//       .node()
//       .getBoundingClientRect().height

//     svg
//       .select(".x-axis")
//       .style("transform", `translateY(${chartPathHeight + 20}px)`)
//       .style("color", "#fff")
//       .style("font-size", "12px")
//       .style("opacity", 0.5)
//       .call(xAxis)
//       .select("path")
//       .style("display", "none")

//     svg.selectAll(".x-axis g text").attr("dy", 0)

//     // const yAxis = axisLeft(yScale)
//     // svg.select(".y-axis").call(yAxis)
//   }, [chartDimensions, brushSelection])

//   return (
//     <>
//       <div ref={containerRef} className={sessionDurationCSS.container}>
//         <h2 className={sessionDurationCSS.title}>Durée moyenne des sessions</h2>
//         <div ref={chartContainerRef} className="chart-container">
//           <svg ref={chartRef} className={sessionDurationCSS.chart}>
//             <g className="x-axis" />
//             {/* <g className={"y-axis"} /> */}
//             <g className={"brush"} />
//           </svg>
//         </div>
//       </div>
//     </>
//   )
// }
