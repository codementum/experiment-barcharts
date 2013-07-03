/*global define, d3 */
define(['datagen', 'util', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen, util) {
  'use strict';

  function init() {
    // Since we only need five, do it the hard way.

    // make initial dataset
    var level = 'high';
    var d = datagen.generate(10, level, 90);

    d3.select('#metadata').select('textarea')
      .attr('rows', 10)
      .attr('cols', 20)
      .text(JSON.stringify(d.metadata));

    // make adjacent
    d.data = datagen.makeAdjacent(d.data);
    d3.select('#vis-adjacent .vis')
      .append('svg')
      .chart('barchart-myown')
      .draw(d.data);
    util.download('#vis-adjacent .vis', '#vis-adjacent .instructions', 'bar-adjacent-'+level);
    
    // make nonAdjacentOne
    d.data = datagen.makeNonAdjacent(d.data, 1);
    d3.select('#vis-nonAdjacentOne .vis')
      .append('svg')
      .chart('barchart-myown')
      .draw(d.data);
    util.download('#vis-nonAdjacentOne .vis', '#vis-nonAdjacentOne .instructions', 'bar-nonAdjacentOne-'+level);
    
    // make nonAdjacentThree
    d.data = datagen.makeNonAdjacent(d.data, 3);
    d3.select('#vis-nonAdjacentThree .vis')
      .append('svg')
      .chart('barchart-myown')
      .draw(d.data);
    util.download('#vis-nonAdjacentThree .vis', '#vis-nonAdjacentThree .instructions', 'bar-nonAdjacentThree-'+level);
    
    // make nonAdjacentFive
    d.data = datagen.makeNonAdjacent(d.data, 5);
    d3.select('#vis-nonAdjacentFive .vis')
      .append('svg')
      .chart('barchart-myown')
      .draw(d.data);
    util.download('#vis-nonAdjacentFive .vis', '#vis-nonAdjacentFive .instructions', 'bar-nonAdjacentFive-'+level);

    // make nonAdjacentSeve
    d.data = datagen.makeNonAdjacent(d.data, 7);
    d3.select('#vis-nonAdjacentSeven .vis')
      .append('svg')
      .chart('barchart-myown')
      .draw(d.data);
    util.download('#vis-nonAdjacentSeven .vis', '#vis-nonAdjacentSeven .instructions', 'bar-nonAdjacentSeven-'+level);

    /*
    var remake = d3.select('#vis-remake .vis')
      .append('svg')
      .attr('height', 300)
      .attr('width', 600)
      .chart('barchart-remake');

    remake.draw(d.data);
    remake.max(40);

    util.download('#vis-remake .vis', '#vis-remake .instructions', 'tested');
    */
  }

  return {
    init: init
  };
});
