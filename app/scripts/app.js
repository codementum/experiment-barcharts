/*global define, d3 */
define(['datagen', 'util', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen, util) {
  'use strict';

  var level = 'high'
    , charts = [
      { name: 'nonAdjacent_5_10', dist: 5, bars: 10},
      { name: 'nonAdjacent_10_20', dist: 10, bars: 20},
      { name: 'nonAdjacent_10_20', dist: 15, bars: 30},
      { name: 'nonAdjacent_20_40', dist: 20, bars: 40}
    ]
    , d;

  function init() {
    charts.forEach(makeChart);
  }

  function updateMetadata(d) {
    d3.select('#metadata').select('textarea')
      .text(JSON.stringify(d));
  }
  
  // TODO re-add functionality for adjacent
  function makeChart(c) {
    if(d && d.metadata)
      d = datagen.generate(c.bars, level, c.dist, d.metadata);
    else
      d = datagen.generate(c.bars, level, c.dist);
//    d.data = datagen.makeNonAdjacent(d.data, c.dist);
  
    var ins = d3.select('#bars').append('div')
      .classed('span2 instructions', true)
      .text(c.name);
  
    var vis = d3.select('#bars').append('div')
      .attr('id', c.name)
      .classed('span8 vis', true);
  
    vis.append('svg')
      .chart('barchart-myown')
      .draw(d.data);
  
    util.download(vis, ins, c.name+'-'+level);
    console.log(d.metadata);
    updateMetadata(d.metadata);
  }

  return {
    init: init
  };
});
