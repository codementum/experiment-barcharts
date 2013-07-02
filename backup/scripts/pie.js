function makePie() {

var randomAngle = false;
var disableSorting = false;
var startAngle = 0, endAngle = 2*3.14;

if(randomAngle) {
  startAngle = Math.random() * (2*3.14);
  endAngle = startAngle + (2*3.14);
}

var rOffset = 20;
var r = Math.min(w, h) / 2 - rOffset,
  color = d3.scale.category20(),
  //donut = d3.layout.pie(), // to disable sorting
  arc = d3.svg.arc().innerRadius(0).outerRadius(r);

var donut;

if(disableSorting) {
  donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle).sort(null);
} else{
  donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle);
}

var piechart = d3.select("body").append("svg")
        .attr("id", "orderedPie")
        .data([data])
        .attr("width", w)
        .attr("height", h);

var arcs = piechart.selectAll("g.arc")
  .data(donut)
  .enter().append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (r+rOffset) + "," + (r+rOffset) + ")");

arcs.append("path")
  //.attr("fill", function(d, i) { return color(i); })
  .attr("d", arc);

arcs.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("text-anchor", "middle")
  .attr("stroke", "black" )
  .attr("fill", "black" )
  .text(function(d, i) { return labels[i]; });
}
