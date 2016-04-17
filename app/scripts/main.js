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
var greyTones = greyscale.domain([ 0.15, 0.95], 17).colors();//[0, 1, 6, 7, 9 , 10, 15, 16];

console.log('tones of grey', greyTones);

console.log('light contrast', greyscale((50 - 15) / (95 - 15)).hex(), chroma.contrast(greyscale((50 - 15) / (95 - 15)), white));
console.log('dark contrast', greyscale((60 - 15) / (95 - 15)).hex(), chroma.contrast(greyscale((60 - 15) / (95 - 15)), black));

var whiteHighlight = chroma.scale([ white, chroma.lch(L.xxLow, c.high, h.orange) ]).correctLightness(true);
console.log('hlwhite', whiteHighlight(1).hex());
var blackHighlight = chroma.scale([ black, chroma.lch(L.xxHigh, c.high, h.orange) ]).correctLightness(true);
console.log('hlblack', blackHighlight(1).hex());

function drawTones() {
        var tones = [ 15, 20, 45, 50, 60, 65, 90, 95 ];

        tones.map(function (tone, index) {
            if (tone > 50) {
                var strokeStyle = whiteHighlight(1).hex();
            } else {
                var strokeStyle = blackHighlight(1).hex();
            }
            var cell = document.getElementById("cell-tone" + tone);
            cell.innerHTML += ": <br />\n" + greyscale((tone - 15) / (95 - 15)).hex();
            cell.style.background = greyscale((tone - 15) / (95 - 15)).hex();
        });
}

function drawColors() {
        Object.keys(h).map(function (color, index) {
            var cell = document.getElementById("cell-" + color);
            cell.innterHTML += ": <bar />\n" + chroma.lch(L.medium, c.low, h[color]).hex();
            cell.style.background = chroma.lch(L.medium, c.low, h[color]).hex();
        });
}

function switchToDark() {
    var navItemDark = document.getElementById('navItemDark');
    var navItemLight = document.getElementById('navItemLight');
    navItemDark.classList.add('active');
    navItemLight.classList.remove('active');
    document.body.style.background = black.hex();
    document.body.style.color = '#979891';
    // document.body.hr.style.borderColor = blackHighlight(1).hex();
    console.log(document.body.style.background);
}

function switchToLight() {
    var navItemDark = document.getElementById('navItemDark');
    var navItemLight = document.getElementById('navItemLight');
    navItemDark.classList.remove('active');
    navItemLight.classList.add('active');
    document.body.style.background = white.hex();
    document.body.style.color = '#7b7e7d';
    // document.body.hr.style.borderColor = whiteHighlight(1).hex();
    console.log(document.body.style.background);
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
