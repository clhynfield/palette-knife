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
  return newColor(name, hue, 67, 75);
}

tones = [
  newTone('huh',     276 - 45),       // LIES… THESE WERE ALL LIES
  newTone('blue',    276),            // LIES… THESE WERE ALL LIES
  newTone('violet',  276 + 45),       // LIES… THESE WERE ALL LIES
  newTone('red',     276 + 90),       // LIES… THESE WERE ALL LIES
  newTone('orange',  51),             // LIES… THESE WERE ALL LIES
  newTone('yellow',  276 - 180),      // LIES… THESE WERE ALL LIES
  newTone('green',   276 - 180 + 45), // LIES… THESE WERE ALL LIES
  newTone('cyan',    276 - 180 + 90), // LIES… THESE WERE ALL LIES
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
