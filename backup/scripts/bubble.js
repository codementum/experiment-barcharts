function makeBubble() {

var jsonData = {
  children: [
    { label:labels[0], value:data[0] },
    { label:labels[1], value:data[1] },
    { label:labels[2], value:data[2] },
    { label:labels[3], value:data[3] },
    { label:labels[4], value:data[4] }
  ]
};

var r = 380;

var bubble = d3.layout.pack()
  .sort(null)
  .size([r, r]);
 
var chart = d3.select("body").append("svg:svg")
  .attr("width", r)
  .attr("height", r)
  .attr("id", "bubble");

var node = chart.selectAll("g.node")
  .data(bubble.nodes(classes(jsonData))
  .filter(function(d) { return !d.children; }))
  .enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
 
node.append("svg:circle")
  .attr("r", function(d) { return d.r; })
  .attr("stroke", "black" )
  .attr("fill", "white" );

// labels
node.append("svg:text")
  .attr("text-anchor", "middle")
  .attr("dy", ".3em")
  .text(function(d) { return d.label.substring(0, d.r/3); });


// Returns a flattened hierarchy containing all leaf nodes under the root.
 function classes(root) {
   var classes = [];
 
   function recurse(name, node) {
   if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
   else classes.push({label: node.label, value: node.value});
   }
 
   recurse(null, root);
   return {children: classes};
 }
}
