'use strict';

var L = {
    'xxLow': 15,
    'low': 25,
    'medium': 50,
    'high': 75,
    'xxHigh': 95
};

var c = {
    'x_low': 15,
    'low': 33,
    'medium': 50,
    'high': 67,
    'x_high': 85,
};

var h = {
    'red':     276 + 120 - 15, // triad
    'orange':  51,             // locked BASE
    'yellow':  276 - 180,      // locked complementary
    'green':   276 - 120 - 15, // triad
    'cyan':    276 - 60 - 15,  // complement triad
    'blue':    276,            // locked BASE
    'violet':  51 + 270 - 15,       //
    'magenta': 276 + 60 - 15,  // complement triad
};

var black = new chroma.lch(15, 15, h.blue);
var white = new chroma.lch(95, 15, h.yellow);
var greyscale = chroma.scale([black, white]).correctLightness(true);

var whiteHighlight = chroma.scale([ white, chroma.lch(L.xxLow, c.high, h.orange) ]).correctLightness(true);
var blackHighlight = chroma.scale([ black, chroma.lch(L.xxHigh, c.high, h.orange) ]).correctLightness(true);

function drawTones() {
        var tones = [ 15, 20, 45, 50, 60, 65, 90, 95 ];

        tones.map(function (tone, index) {
            if (tone > 50) {
                var strokeStyle = whiteHighlight(1).hex();
            } else {
                var strokeStyle = blackHighlight(1).hex();
            }
            var cell = document.getElementById("cell-tone" + tone);
            cell.innerHTML += ": <br />\n" + chromaToString(greyscale((tone - 15) / (95 - 15)));
            cell.style.background = greyscale((tone - 15) / (95 - 15)).hex();
            if ( tone < 30 ) {
                cell.style.color = white;
            } else {
                cell.style.color = black;
            }
        });
}

function toInt(num) {
    return parseFloat((num).toFixed(0));
}

function chromaToString(color) {
    return "" 
        + Math.round(color.hsv()[0]) 
        + ", " + Math.round(color.hsv()[1]*100)
        + ", " + Math.round(color.hsv()[2]*100);
}

function drawColors() {
        Object.keys(h).map(function (color, index) {
            var cell = document.getElementById("cell-" + color);
            cell.innerHTML += ": <br />\n" + chromaToString(chroma.lch(L.medium, c.low, h[color]));
            cell.style.background = chroma.lch(L.medium, c.low, h[color]).hex();
            cell.style.color = black;
        });
}

function switchToDark() {
    var navItemDark = document.getElementById('navItemDark');
    var navItemLight = document.getElementById('navItemLight');
    navItemDark.classList.add('active');
    navItemLight.classList.remove('active');
    document.body.style.background = black.hex();
    document.body.style.color = '#979891';
}

function switchToLight() {
    var navItemDark = document.getElementById('navItemDark');
    var navItemLight = document.getElementById('navItemLight');
    navItemDark.classList.remove('active');
    navItemLight.classList.add('active');
    document.body.style.background = white.hex();
    document.body.style.color = '#7b7e7d';
}

function draw() {
    switchToDark();
    drawColors();
    drawTones();
}

document.addEventListener('DOMContentLoaded', function() {
  draw();
  var navLinkDark = document.getElementById('navLinkDark');
  var navLinkLight = document.getElementById('navLinkLight');

  navLinkDark.addEventListener('click', switchToDark, false);
  navLinkLight.addEventListener('click', switchToLight, false);
});
