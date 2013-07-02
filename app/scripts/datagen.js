/*global define, d3 */
define(['d3'], function () {
  'use strict';

  var d = {
    values: [6,9,12,39,30,23],
    labels: ['','A','','B','','']
  };

  // var d = {
  //   values: [6,9,12,39,30,23,6,15,28,9],
  //   labels: ['','A','','B','','','','','','']
  // };

  function data() {
    return d;
  }

  return {
    data: data
  };
});
