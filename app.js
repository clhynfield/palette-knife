'use strict';

var chroma = require('chroma-js');
var cdiff = require('color-diff');
var palette = [];

function closest(color, palette) {
    palette.map(function (paletteColor, index, palette) {
        palette[index] = {
            'R': paletteColor.rgb()[0],
            'G': paletteColor.rgb()[1],
            'B': paletteColor.rgb()[2]
        };
    });

    color = {
        'R': color.rgb()[0],
        'G': color.rgb()[1],
        'B': color.rgb()[2]
    };

    console.log(color, palette);

    var bestMatch = cdiff.closest(color, palette);

    return new chroma(bestMatch.R, bestMatch.G, bestMatch.B);
}

var L = {
    'xx-low': 15,
    'low': 25,
    'medium': 50,
    'high': 75,
    'xx-high': 95
};

var c = {
    'x-low': 15,
    'low': 33,
    'medium': 50,
    'high': 67,
    'x-high': 85,
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

var black = new chroma.lch(15, 15, h['blue']);
var white = new chroma.lch(95, 15, h['yellow']);
var orange = new chroma.lch(L['medium'], c['high'], h['orange']);
var greyscale = chroma.scale([black, white]);

var whiteHighlight = chroma.scale([ white, chroma.lch(L['xx-low'], c['high'], h['orange']) ]);
console.log('hlwhite', whiteHighlight(1).hex());
var blackHighlight = chroma.scale([ black, chroma.lch(L['xx-high'], c['high'], h['orange']) ]);
console.log('hlblack', blackHighlight(1).hex());

Object.keys(h).map(function (color, index) {
    palette.push(new chroma.lch(
        L['medium'],
        c['low'],
        h[color]
    ));
});

console.log(closest(new chroma('navy'), palette));
