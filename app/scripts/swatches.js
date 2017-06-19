var newColor = function (name, hue, chroma, luma) {
  var d3color = d3.hcl(hue, chroma, luma);
  var color = {
    'name': name,
    'color': d3color,
    'rgb': d3color.rgb(),
    'hue': hue
  };
  return color;
}


var newTone = function (name, hue) {
  return newColor(name, hue, 95, 67);
}

var blue = 276;
var orange = 51;

tones = [
  newTone('blue',    blue),
  newTone('violet',  blue + 30),
  newTone('magenta', blue + 60),
  newTone('red',     blue + 90),
  newTone('orange',  orange),
  newTone('yellow',  blue + 180),
  newTone('green',   blue + 180 + 45),
  newTone('cyan',    blue + 180 + 90),
];


// var scale =

var newShade = function (name, increment) {
  var hue = 276;
  var luma = increment;
  return newColor(hue, 67, luma);
}

shades = [
  newShade(15),
];


var r = 100;
var theta = 2 * Math.PI / tones.length;
function cx(d, i) {
  return(r * Math.cos(d.hue*2*Math.PI/360) + 128);
  return(r * Math.cos(i * theta) + 128);
}
function cy(d, i) {
  return(r * Math.sin(d.hue*2*Math.PI/360) + 128);
  return(r * Math.sin(i * theta) + 128);
}

var swatchContainer = d3.select("main").append("svg")
  .attr("width", 256)
  .attr("height", 256);

var toneSwatches = swatchContainer.selectAll("circle")
  .data(tones);

toneSwatches.enter().append("circle")
  .attr('cx', function(d, i) {return cx(d, i);})
  .attr('cy', function(d, i) {return cy(d, i);})
  .style('fill', function(d, i) { return d.rgb; })
  .attr('r', 24);

toneSwatches.exit().remove();




function colorHeader(color) {
  return color.name;
}

var toneTable = d3.select("main").append("table");

var toneTableRows = toneTable.selectAll("tr")
  .data(tones);

toneTableRows.enter().append("tr")
  .append("th")
  .text(function(d) { return colorHeader(d); })
  .style('background-color', function(d) {return d.rgb;});

toneTableRows.exit().remove();
