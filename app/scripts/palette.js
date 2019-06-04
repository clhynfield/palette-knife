var newColor = function (name, hue, chroma, luma) {
  var d3color = d3.hcl(hue, chroma, luma);
  var color = {
    'name': name,
    'color': d3color,
    'hex': d3color.hex(),
    'rgb': d3color.rgb(),
    'hue': hue,
  };
  return color;
}


var newTone = function (name, hue) {
  return newColor(name, hue, 67, 50);
}

tones = [
  newTone('red',     276 + 90), // triad
  newTone('orange',  51),             // locked BASE
  newTone('yellow',  276 - 180),      // locked complementary
  newTone('green',   276 - 135), // triad
  newTone('cyan',    276 - 75),  // complement triad
  newTone('blue',    276),            // locked BASE
  newTone('violet',  276 + 30),       //
  newTone('magenta', 276 + 60),  // complement triad
];


var black = newColor('black', 276, 15, 15);
var white = newColor('black', 276 - 180, 15, 95);

var newShade = function (name, increment) {
  var hue = 276;
  var luma = increment;
  return newColor(name, hue, 15, luma);
}

shades = [
  newShade('first', 15),
  newShade('second', 20),
  newShade('second', 45),
  newShade('second', 50),
  newShade('second', 60),
  newShade('second', 65),
  newShade('second', 90),
  newShade('second', 95),
];


var r = 50;
var theta = 2 * Math.PI / tones.length;
function cx(d, i) {
  return(r * Math.cos(d.hue*2*Math.PI/360) + 100);
  return(r * Math.cos(i * theta) + 100);
}
function cy(d, i) {
  return(r * Math.sin(d.hue*2*Math.PI/360) + 100);
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

var palette = tones.concat(shades);

function colorHeader(color) {
  return color.name;
}

var toneTable = d3.select("main").append("table");

var toneTableRows = toneTable.selectAll("tr")
  .data(palette);

toneTableRows.enter().append("tr")
  .append("th")
  .text(function(d) { return colorHeader(d) + " " + d.hex; })
  .style('background-color', function(d) {return d.rgb;});

toneTableRows.exit().remove();
