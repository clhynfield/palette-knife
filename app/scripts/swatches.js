var newTone = function (name, hue) {
  var color = d3.hcl(hue, 75, 75);
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

var swatchContainer = d3.select("body").append("svg")
  .attr("width", 200)
  .attr("height", 200);

var r = 50;
var theta = 2 * Math.PI / tones.length;
console.log(((2 * Math.PI)/theta).toString());
function cx(d, i) {
     console.log(i.toString());
     return(r * Math.cos(i * theta) + 100);
}
function cy(d, i) {
   return(r * Math.sin(i * theta) + 100);
}

var toneSwatches = swatchContainer.selectAll("circle")
  .data(tones)
  .text(function (d) { return d; })
              .attr('cx', function(d, i) {return cx(d, i*theta);})
  .attr('cy', function(d, i) {return cy(d, i*theta);})
  .attr('r', 12);

toneSwatches.enter().append("circle")
  .text(function(d) { return d; })
  .attr('cx', function(d, i) {return cx(d, i);})
  .attr('cy', function(d, i) {return cy(d, i);})
  .style('fill', function(d, i) { return d.rgb; })
  .attr('r', 12);

toneSwatches.exit().remove();
