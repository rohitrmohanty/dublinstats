document.addEventListener('DOMContentLoaded', function() {
  fetch('/data/indicator-1-unemployment.csv')
    .then(response => response.text())
    .then(data => {
      const parsedData = d3.csvParse(data);
      drawUnemploymentChart(parsedData);
    })

  function drawUnemploymentChart(data) {
    const svg = d3.select('#unemployment-chart')
                  .append("svg")
                  .attr("width", 600)
                  .attr("height", 400);
  }
})
