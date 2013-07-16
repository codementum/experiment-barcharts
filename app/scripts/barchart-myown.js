/*global define, d3 */
define(['d3', 'd3chart'], function () {
  'use strict';

  d3.chart('barchart-myown', {
    initialize: function() {
      var c = this;
      c.w        = 600;
      c.h        = 300;
      c.pad      = 20;
      c.barWidth = 10;
      c.hardMax  = 40;
      c.xScale   = d3.scale.linear();
      c.yScale   = d3.scale.linear();
      c.fillWidth = true;
      // reset svg-level height
      c.base.attr('height', c.h);

      this.layer('bars', this.base.append('g'), {

        dataBind: function(data) {
          var d = data;
          c.hardMax  = d3.max(d, function(d) { return d.value*1.1; });
          // if width should expand, adjust xScale and barWidth
          if(c.fillWidth){
            c.barWidth  = (c.w/d.length)/2;
            c.xScale.range([c.barWidth + c.pad, c.w - c.pad]);
          }
          // set width to accomodate data length
          c.w = (c.barWidth * 2 * d.length);
          // reset svg-level width
          c.base.attr('width', c.w);
          // set xScale to acoomodate data length
          c.xScale.domain([0, d.length])
            .range([c.pad*2, c.w - c.pad]);
          // set xScale to acoomodate data size
          c.yScale.domain([0, c.hardMax ? c.hardMax : d3.max(d, function(d) { return d.value; })]) // might need getter
            .range([0, c.h - c.pad]);
          // y axis line
          this.append('line')
              .attr('y1', c.pad)
              .attr('y2', c.h - c.pad)
              .attr('x1', c.pad)
              .attr('x2', c.pad)
              .style('stroke', '#000');
          // top label
          this.append('text')
              .text('100')
              .attr('x', 0)
              .attr('y', c.pad + 5)
              .attr('font-size', 10);
          // bottom label
          this.append('text')
              .text('0')
              .attr('x', 12)
              .attr('y', c.h - c.pad)
              .attr('font-size', 10);
          // x axis line
          this.append('line')
              .attr('x1', c.pad)
              .attr('x2', c.w - c.pad)
              .attr('y1', c.h - c.pad)
              .attr('y2', c.h - c.pad)
              .style('stroke', '#000');

          return this.selectAll('rect')
                  .data(d);
        },

        insert: function() {
          return this.append('rect')
                  .style('stroke', 'black')
                  .style('fill', 'white');
        },

        events: {
          'enter': function() {
            return this.attr('x', function(d, i) { return c.xScale(i); })
                    .attr('y', function(d) { return c.h - c.yScale(d.value) - c.pad; })
                    .attr('width', c.barWidth)
                    .attr('height', function(d) { return c.yScale(d.value); });
          }
        }
      });

      this.layer('labels', this.base.append('g'), {
        dataBind: function(data) {
          var d = data;
          return this.selectAll('text').data(d);
        },

        insert: function() {
          return this.append('text');
        },

        events: {
          'enter': function() {
            return this.attr('x', function(d, i) { return c.xScale(i) + c.barWidth/2; })
                    .attr('y', function() { return c.h - c.pad/2; })
                    .attr('font-size', 10)
                    .attr('text-anchor', 'middle')
                    .text(function(d) { return d.name; });
          }
        }
      });
    }
  });
});
