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
var greyscale = chroma.scale([black, white]).correctLightness(true);
var greyTones = greyscale.domain([ 0.15, 0.95], 17).colors();//[0, 1, 6, 7, 9 , 10, 15, 16];

console.log('tones of grey', greyTones);

console.log('light contrast', greyscale((50 - 15) / (95 - 15)).hex(), chroma.contrast(greyscale((50 - 15) / (95 - 15)), white));
console.log('dark contrast', greyscale((60 - 15) / (95 - 15)).hex(), chroma.contrast(greyscale((60 - 15) / (95 - 15)), black));

var whiteHighlight = chroma.scale([ white, chroma.lch(L['xx-low'], c['high'], h['orange']) ]).correctLightness(true);
console.log('hlwhite', whiteHighlight(1).hex());
var blackHighlight = chroma.scale([ black, chroma.lch(L['xx-high'], c['high'], h['orange']) ]).correctLightness(true);
console.log('hlblack', blackHighlight(1).hex());

function drawTones() {
    var canvas = document.getElementById('tones');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var tones = [ 15, 20, 45, 50, 60, 65, 90, 95 ];

        tones.map(function (tone, index) {
            if (tone > 50) {
                ctx.strokeStyle = whiteHighlight(1).hex();
            } else {
                ctx.strokeStyle = blackHighlight(1).hex();
            }
            ctx.fillStyle = greyscale((tone - 15) / (95 - 15)).hex();
            ctx.strokeRect((64 * index) + 16, 16, 48, 48);
            ctx.fillRect((64 * index) + 16, 16, 48, 48);
            console.log(tone, greyscale((tone - 15) / (95 - 15)).hex(), index);
        });
    }
}

function drawColors() {
    var canvas = document.getElementById('colors');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        Object.keys(h).map(function (color, index) {
            ctx.strokeStyle = black.hex();
            ctx.strokeRect((64 * index) + 16, 16, 48, 48);
            ctx.fillStyle = chroma.lch(
                L['medium'],
                c['low'],
                h[color]
            ).hex();
            ctx.fillRect((64 * index) + 16, 16, 48, 48);
            console.log(color, chroma.lch(L['medium'], c['low'], h[color]).hex());
            console.log('br' + color, chroma.lch(L['medium'], c['medium'], h[color]).hex());
        });
    }
}

function draw() {
    switchToDark();
    drawColors();
    drawTones();
}

function switchToDark() {
    var navLinkDark = document.getElementById('navLinkDark');
    var navLinkLight = document.getElementById('navLinkLight');
    navLinkDark.classList.add('active');
    navLinkLight.classList.remove('active');
    document.body.style.background = black.hex();
    document.body.style.color = '#979891';
    // document.body.hr.style.borderColor = blackHighlight(1).hex();
    console.log(document.body.style.background);
}

function switchToLight() {
    var navLinkDark = document.getElementById('navLinkDark');
    var navLinkLight = document.getElementById('navLinkLight');
    navLinkDark.classList.remove('active');
    navLinkLight.classList.add('active');
    document.body.style.background = white.hex();
    document.body.style.color = '#7b7e7d';
    // document.body.hr.style.borderColor = whiteHighlight(1).hex();
    console.log(document.body.style.background);
}
