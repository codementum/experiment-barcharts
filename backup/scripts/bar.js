function makeBar() {
var barchart = d3.select("body").append("svg")
        .attr("id", "adjacentBar")
        .attr("width", w)
        .attr("height", h);

var barwidth = 30;
var pad = 20;

// scale for bar heights according to CMcGill data
var y = d3.scale.linear()
      .domain([0, 40])
      .range([0, h - pad*2]);

// scale for bar spacing
var x = d3.scale.linear()
      .domain([0, data.length])
      .range([barwidth, w - pad]);

barchart.selectAll("rect")
   .data(data)
   .enter().append("rect")
   .attr("x", function(d, i) { return x(i) + pad; })
   .attr("y", function(d) { return h - y(d) - pad; })
   .attr("width", barwidth)
   .attr("height", function(d) { return y(d); });

barchart.selectAll("text")
   .data(labels)
   .enter().append("text")
   .attr("x", function(d, i) { return x(i) + barwidth; })
   .attr("y", function(d) { return h - pad/2 + 5 ; })
   .text(String);

// y axis line
barchart.append("line")
    .attr("y1", pad)
    .attr("y2", h - pad)
    .attr("x1", pad)
    .attr("x2", pad)
    .style("stroke", "#000");

// top label
barchart.append("text")
    .text("100")
    .attr("x", 0)
    .attr("y", pad + 5)
    .attr("font-size", 10);

// bottom label
barchart.append("text")
    .text("0")
    .attr("x", 12)
    .attr("y", h - pad)
    .attr("font-size", 10);

// x axis line
barchart.append("line")
    .attr("x1", pad)
    .attr("x2", w - pad)
    .attr("y1", h - pad)
    .attr("y2", h - pad)
    .style("stroke", "#000");

}
