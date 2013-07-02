/*global define, d3 */
define(['datagen', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen) {
  'use strict';

  function init() {
    var d = datagen.generate(10, 'low', 90, 'nonadjacent', 7);

    console.log(d.metadata);

    var myown = d3.select('#vis-myown')
      .append('svg')
      .style('border', 'solid 1px #aaa')
      .chart('barchart-myown');

    myown.draw(d.data);

    var remake = d3.select('#vis-remake')
      .append('svg')
      .style('border', 'solid 1px #aaa')
      .attr('height', 300)
      .attr('width', 600)
      .chart('barchart-remake');

    remake.draw(d.data);
    remake.max(40);
  }

  return {
    init: init
  };
});
