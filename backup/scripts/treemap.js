function makeTree() {

var treeData = {name: "tree", children:[
  {name:labels[0], size:data[0]},
  {name:labels[1], size:data[1]},
  {name:labels[2], size:data[2]},
  {name:labels[3], size:data[3]},
  {name:labels[4], size:data[4]}
]};

   var treemap = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.size; }); 

   var chart = d3.select("body").append("svg")
    .attr("id", "treemap")
    .style("position", "relative")
    .data(d3.entries(treeData))
    .attr("width", w)
    .attr("height", h);

   treemap.nodes(treeData);

   var cell = chart.selectAll("g")
    .data(treemap)
  .enter().append("svg:g")
    .attr("class", "cell")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


   cell.append("svg:rect")
    .attr("width", function(d) { return d.dx; })
    .attr("height", function(d) { return d.dy; })
    .attr("stroke", "black" )
    .attr("fill", "white" );
   // .style("fill", function(d) { return d.children ? color(d.data.key) : null; });

   cell.append("svg:text")
    .attr("x", function(d) { return d.dx / 2; })
    .attr("y", function(d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name; });

}
