function makeStackedBar() {

  // divide the data based on A and B position
  var leftBar = [];
  var rightBar = [];
  var aIsLeft = true;
  if(Math.random() > 0.5) { 
    leftBar.push(data[Apos]);
    rightBar.push(data[Bpos]);
    aIsLeft = true;
  } else {
    leftBar.push(data[Bpos]);
    rightBar.push(data[Apos]);
    aIsLeft = false;
  }
  
  // randomly distribute the rest of the data
  var chosen = [Apos, Bpos];
  var choice = Math.floor(Math.random()*5);
  while(chosen.length < 5) {
    if(chosen.indexOf(choice) < 0) {
      if(Math.random() > .5) {
        leftBar.push(data[choice]);
      } else {
        rightBar.push(data[choice]);
      }
      chosen.push(choice);
    }
    choice = Math.floor(Math.random()*5);
  }

  var leftStart = leftBar.length;
  var rightStart = rightBar.length;
  while(d3.sum(leftBar) != 100) {
    leftBar = leftBar.slice(0, leftStart);
    leftBar = fillDataArray(leftBar);
  }
  while(d3.sum(rightBar) != 100) {
    rightBar = rightBar.slice(0, rightStart);
    rightBar = fillDataArray(rightBar);
  }

  // now build the bar charts
  var stack = d3.layout.stack()
    .values(function(d, i) { return d[i]; }); 

  var chart = d3.select("body").append("svg")
        .attr("id", "stackedBar")
        .attr("width", w)
        .attr("height", h);

  var barwidth = 90;
  var pad = 20;

  // scale for bar heights according to CMcGill data
var y = d3.scale.linear()
      .domain([0, 40])
      .range([0, 100 + 25]);

// scale for bar spacing
var x = d3.scale.linear()
      .domain([0, data.length])
      .range([barwidth, w - pad]);

chart.selectAll("rect")
   .data(leftBar)
   .enter().append("rect")
   .attr("x", function(d, i) { return  w/5; })
   .attr("y", function(d, i) { var y0 = isNaN(leftBar[i-1]) ? 0 : d3.sum(leftBar.slice(0, i)); return (h - y(d) - pad) - (y(y0)); })
   .attr("width", barwidth)
   .attr("height", function(d) { return y(d); });

chart.selectAll("rect2")
   .data(rightBar)
   .enter().append("rect")
   .attr("x", function(d, i) { return (w/5)*3; })
   .attr("y", function(d, i) { var y0 = isNaN(rightBar[i-1]) ? 0 : d3.sum(rightBar.slice(0, i)); return (h - y(d) - pad) - (y(y0)); })
   .attr("width", barwidth)
   .attr("height", function(d) { return y(d); });


// left label
var leftText = aIsLeft ? 'A' : 'B';
var rightText = aIsLeft ? 'B' : 'A';
chart.append("text")
    .text(leftText)
    .attr("x", w/5 + barwidth/2)
    //.attr("y", h - pad - 10)
    .attr("y", function() { return (h - y(leftBar[0])/2 - pad + 5); })
    .attr("font-size", 10);

// right label
chart.append("text")
    .text(rightText)
    .attr("x", (w/5)*3 + barwidth/2)
    //.attr("y", h - pad - 10)
    .attr("y", function() { return (h - y(rightBar[0])/2 - pad + 5); })
    .attr("font-size", 10);

// y axis line
chart.append("line")
    .attr("y1", pad)
    .attr("y2", h - pad)
    .attr("x1", pad)
    .attr("x2", pad)
    .style("stroke", "#000");

// top label
chart.append("text")
    .text("100")
    .attr("x", 0)
    .attr("y", pad + 5)
    .attr("font-size", 10);

// bottom label
chart.append("text")
    .text("0")
    .attr("x", 12)
    .attr("y", h - pad)
    .attr("font-size", 10);

// x axis line
chart.append("line")
    .attr("x1", pad)
    .attr("x2", w - pad)
    .attr("y1", h - pad)
    .attr("y2", h - pad)
    .style("stroke", "#000");

}
