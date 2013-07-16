/*global define, d3 */
define(['d3'], function () {

  function grabSVG(node) {
    return "<?xml version='1.0' encoding='utf-8'?>"
    + "<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"
    + (new XMLSerializer()).serializeToString(node);
  }

  function download(targetDiv, targetLink, filename) {
    var filename = filename
      , node     = targetDiv.select('svg').node();

    var text = grabSVG(node);
    var dataUrl = 'data:image/svg+xml;base64,' + btoa(text);

    var a = targetLink
      .append('div').append('a')
      .attr("download", filename + ".svg")
      .attr("type", "image/svg+xml")
      .attr("href", dataUrl)
      .style("display", "inline")
      .text('download this one');

    setTimeout(function() {
      window.URL.revokeObjectURL(dataUrl);
    }, 10);
  }

  return {
    grabSVG: grabSVG,
    download: download
  };
});
