document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/unemployment')
    .then(response => response.json())
    .then(data => {
      console.log("Sample Data Entry:", data[0]);
      console.log("Received Data:", data); // Check if data is received
      drawUnemploymentChart(data);
    });

  function drawUnemploymentChart(data) {
  // Set up SVG dimensions
  const width = 1200;
  const height = 900;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Create SVG element and add a border for visibility
  const svg = d3.select('#unemployment-chart')
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("border", "1px solid black");

  // Set up x and y scales
  const xScale = d3.scaleBand()
                   .domain(data.map((d, i) => i)) // Use index for each data point
                   .range([margin.left, width - margin.right])
                   .padding(0.1);

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, d => parseFloat(d["Dublin\nUnemployment Rate SA (%)"].replace('%', '')))])
                   .range([height - margin.bottom, margin.top]);

  // Add bars to the SVG
  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", (d, i) => xScale(i))
     .attr("y", d => yScale(parseFloat(d["Dublin\nUnemployment Rate SA (%)"].replace('%', ''))))
     .attr("width", xScale.bandwidth())
     .attr("height", d => height - margin.bottom - yScale(parseFloat(d["Dublin\nUnemployment Rate SA (%)"].replace('%', ''))))
     .attr("fill", "steelblue");

  // Add x-axis and y-axis
  const xAxis = d3.axisBottom(xScale).tickFormat((d, i) => data[i].Quarter); // Label with quarters
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .attr("transform", `translate(0,${height - margin.bottom})`)
     .call(xAxis)
     .selectAll("text")
     .attr("transform", "rotate(-45)")
     .style("text-anchor", "end");

  svg.append("g")
     .attr("transform", `translate(${margin.left},0)`)
     .call(yAxis);
}
});
