/*global define, d3 */
define(['datagen', 'barchart-myown', 'barchart-remake', 'd3', 'd3chart'], function (datagen) {
  'use strict';

  function init() {
    var d = datagen.data();

    var chart = d3.select('#vis-myown')
      .append('svg')
      .style('border', 'solid 1px #aaa')
      .chart('barchart-myown');

    chart.draw(d);

    d3.select('#vis-remake')
      .append('svg')
      .attr('height', 300)
      .attr('width', 800)
      .chart('barchart-remake')
      .draw([
        { name : 'January', value : 29 },
        { name : 'February', value : 32 },
        { name : 'March', value : 48 },
        { name : 'April', value : 49 },
        { name : 'May', value : 58 },
        { name : 'June', value : 68 },
        { name : 'July', value : 74 },
        { name : 'August', value : 73 },
        { name : 'September', value : 65 },
        { name : 'October', value : 54 },
        { name : 'November', value : 45 },
        { name : 'December', value : 35 }
      ]);



  }

  return {
    init: init
  };
});
