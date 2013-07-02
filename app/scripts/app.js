/*global define, d3 */
define(['datagen', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen) {
  'use strict';

  function init() {
    var d = datagen.data();

    var myown = d3.select('#vis-myown')
      .append('svg')
      .style('border', 'solid 1px #aaa')
      .chart('barchart-myown');

    myown.draw(d);

    var remake = d3.select('#vis-remake')
      .append('svg')
      .style('border', 'solid 1px #aaa')
      .attr('height', 300)
      .attr('width', 600)
      .chart('barchart-remake');

    remake.draw(d);
    remake.max(40);
  }

  return {
    init: init
  };
});
