require.config({
  paths: {
    bootstrap:  'vendor/bootstrap',
    d3:     '../bower_components/d3/d3',
    d3chart:  '../bower_components/d3.chart/d3.chart'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    d3chart: {
      deps: ['d3']
    }
  }
});

require(['app'], function (app) {
  'use strict';
  app.init();
});
