import config from "./config.js";
import chartState from "./chartState.js";
import { formatPercent, formatQuarter } from "./utils.js";

export function createChart(container) {
  // Create SVG
  const svg = d3
    .select(container)
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${config.dimensions.width} ${config.dimensions.height}`
    )
    .attr("style", "max-width: 100%; height: auto;");

  chartState.setSvg(svg);
  initializeScales();
  createAxes();
  drawLines();
  createLegend();
  setupInteractions();
}

function initializeScales() {
  const { width, height, margin } = config.dimensions;

  const xScale = d3
    .scaleBand()
    .domain(chartState.data.map((d) => d.Quarter))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(chartState.data, (d) =>
        Math.max(
          d["National Unemployment Rate SA (%)"],
          d["Dublin Unemployment Rate SA (%)"]
        )
      ) * 1.1,
    ])
    .nice()
    .range([height - margin.bottom, margin.top]);

  chartState.setScales({ x: xScale, y: yScale });
}

function createAxes() {
  const { height, margin } = config.dimensions;

  // Create and add x-axis
  const xAxis = d3
    .axisBottom(chartState.scales.x)
    .tickValues(chartState.scales.x.domain().filter((_, i) => i % 4 === 0))
    .tickFormat(formatQuarter);

  chartState.svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Create and add y-axis
  const yAxis = d3
    .axisLeft(chartState.scales.y)
    .ticks(10)
    .tickFormat(formatPercent);

  chartState.svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);
}

function drawLines() {
  const lineGenerators = {
    dublin: d3
      .line()
      .x(
        (d) =>
          chartState.scales.x(d.Quarter) + chartState.scales.x.bandwidth() / 2
      )
      .y((d) => chartState.scales.y(d["Dublin Unemployment Rate SA (%)"])),

    national: d3
      .line()
      .x(
        (d) =>
          chartState.scales.x(d.Quarter) + chartState.scales.x.bandwidth() / 2
      )
      .y((d) => chartState.scales.y(d["National Unemployment Rate SA (%)"])),
  };

  // Draw Dublin line
  chartState.lines.dublin = chartState.svg
    .append("path")
    .datum(chartState.data)
    .attr("class", "line dublin-line")
    .attr("fill", "none")
    .attr("stroke", config.colors.dublin)
    .attr("stroke-width", 2)
    .attr("d", lineGenerators.dublin);

  // Draw National line
  chartState.lines.national = chartState.svg
    .append("path")
    .datum(chartState.data)
    .attr("class", "line national-line")
    .attr("fill", "none")
    .attr("stroke", config.colors.national)
    .attr("stroke-width", 2)
    .attr("d", lineGenerators.national);
}

function createLegend() {
  const legend = chartState.svg
    .append("g")
    .attr("class", "legend")
    .attr(
      "transform",
      `translate(${config.dimensions.width - 150}, ${
        config.dimensions.margin.top
      })`
    );

  // Add legend items
  const items = [
    { label: "Dublin Rate", color: config.colors.dublin },
    { label: "National Rate", color: config.colors.national },
  ];

  items.forEach((item, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

    g.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", item.color);

    g.append("text")
      .attr("x", 15)
      .attr("y", 10)
      .text(item.label)
      .style("font-size", "12px");
  });
}

function setupInteractions() {
  // Create tooltip
  chartState.setTooltip(
    d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)
  );

  // Add invisible overlay for mouse tracking
  const overlay = chartState.svg
    .append("rect")
    .attr("class", "overlay")
    .attr("width", config.dimensions.width)
    .attr("height", config.dimensions.height)
    .style("opacity", 0);

  overlay.on("mousemove", handleMouseMove).on("mouseout", handleMouseOut);
}

function handleMouseMove(event) {
  const [mouseX] = d3.pointer(event);
  const { x: xScale } = chartState.scales;

  // Find closest data point using bisector
  const bisect = d3.bisector(
    (d) => xScale(d.Quarter) + xScale.bandwidth() / 2
  ).left;
  const index = Math.min(
    chartState.data.length - 1,
    bisect(chartState.data, mouseX)
  );

  const d = chartState.data[index];

  if (
    d &&
    mouseX >= config.dimensions.margin.left &&
    mouseX <= config.dimensions.width - config.dimensions.margin.right
  ) {
    chartState.tooltip
      .style("opacity", 1)
      .html(
        `
                <strong>${d.Quarter}</strong><br/>
                Dublin: ${formatPercent(
                  d["Dublin Unemployment Rate SA (%)"]
                )}<br/>
                National: ${formatPercent(
                  d["National Unemployment Rate SA (%)"]
                )}
            `
      )
      .style("left", `${event.pageX + config.tooltip.offset.x}px`)
      .style("top", `${event.pageY + config.tooltip.offset.y}px`);
  } else {
    chartState.tooltip.style("opacity", 0);
  }
}

function handleMouseOut() {
  chartState.tooltip.style("opacity", 0);
}

export function updateChart() {
  // Handle updates if needed
  initializeScales();
  createAxes();
  drawLines();
}
