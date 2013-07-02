function makeSidewaysBar() {
var sbar = d3.select("body").append("svg")
        .attr("id", "horizontalBar")
        .attr("width", w)
        .attr("height", h);

var barwidth = 30;
var pad = 20;

// scale for bar heights according to CMcGill data
var y = d3.scale.linear()
      .domain([0, 40])
      .range([0, w - pad*2]);
      //.domain([0, d3.max(data)])

// scale for bar spacing
var x = d3.scale.linear()
      .domain([0, data.length])
      .range([barwidth, h - pad]);

// bars
sbar.selectAll("rect")
   .data(data)
   .enter().append("rect")
   //.attr("x", function(d) { return w - y(d) - pad; })
   .attr("x", function(d) { return pad; })
   .attr("y", function(d, i) { return x(i) + pad; })
   .attr("width", function(d) { return y(d); })
   .attr("height", barwidth);

// labels
sbar.selectAll("text")
   .data(labels)
   .enter().append("text")
   //.attr("x", function(d, i) { return x(i) + barwidth; })
   //.attr("y", function(d) { return w - pad/2 + 5 ; })
   .attr("x", function(d) { return pad/2 - 2; })
   .attr("y", function(d, i) { return x(i) + pad*2; })
   .text(String);

// y axis line
sbar.append("line")
    .attr("y1", pad)
    .attr("y2", w - pad)
    .attr("x1", pad)
    .attr("x2", pad)
    .style("stroke", "#000");

// x axis line
sbar.append("line")
    .attr("x1", pad)
    .attr("x2", h - pad)
    .attr("y1", w - pad)
    .attr("y2", w - pad)
    .style("stroke", "#000");


// top y label
sbar.append("text")
    .text("100")
    .attr("y", h - pad/2)
    .attr("x", w - pad - 12)
    .attr("font-size", 10);

// bottom y label
sbar.append("text")
    .text("0")
    .attr("y", h - pad/2)
    .attr("x", pad)
    .attr("font-size", 10);


}


