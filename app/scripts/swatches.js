var newTone = function (name, hue) {
  var color = d3.hcl(hue, 67, 75);
  var tone = {
    'name': name,
    'color': color,
    'rgb': color.rgb()
  }
  return tone;
}

tones = [
  newTone('red',     276 + 120 - 15), // triad
  newTone('orange',  51),             // locked BASE
  newTone('yellow',  276 - 180),      // locked complementary
  newTone('green',   276 - 120 - 15), // triad
  newTone('cyan',    276 - 60 - 15),  // complement triad
  newTone('blue',    276),            // locked BASE
  newTone('violet',  51 + 270 - 15),       //
  newTone('magenta', 276 + 60 - 15),  // complement triad
];



var r = 50;
var theta = 2 * Math.PI / tones.length;
function cx(d, i) {
  return(r * Math.cos(i * theta) + 100);
}
function cy(d, i) {
  return(r * Math.sin(i * theta) + 100);
}

var swatchContainer = d3.select("main").append("svg")
  .attr("width", 200)
  .attr("height", 200);

var toneSwatches = swatchContainer.selectAll("circle")
  .data(tones);

toneSwatches.enter().append("circle")
  .attr('cx', function(d, i) {return cx(d, i);})
  .attr('cy', function(d, i) {return cy(d, i);})
  .style('fill', function(d, i) { return d.rgb; })
  .attr('r', 12);

toneSwatches.exit().remove();




function colorHeader(color) {
  return color.name;
}

var toneTable = d3.select("main").append("table");

var toneTableRows = toneTable.selectAll("tr")
  .data(tones);

toneTableRows.enter().append("tr")
  .append("th")
  .text(function(d) { return colorHeader(d); });

toneTableRows.exit().remove();
