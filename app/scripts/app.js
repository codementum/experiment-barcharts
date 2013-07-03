/*global define, d3 */
define(['datagen', 'util', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen, util) {
  'use strict';

  function init() {
    var d = datagen.generate(10, 'low', 90, 'nonadjacent', 7);

    console.log(d.metadata);

    var myown = d3.select('#vis-myown .vis')
      .append('svg')
      .chart('barchart-myown');

    myown.draw(d.data);

    util.download('#vis-myown .vis', '#vis-myown .instructions', 'tested');

    var remake = d3.select('#vis-remake .vis')
      .append('svg')
      .attr('height', 300)
      .attr('width', 600)
      .chart('barchart-remake');

    remake.draw(d.data);
    remake.max(40);

    util.download('#vis-remake .vis', '#vis-remake .instructions', 'tested');
  }

  return {
    init: init
  };
});
