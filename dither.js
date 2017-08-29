// The standard 4x4 (64 pixel) dithering matrix

var dither = [
    [0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0],
    [1, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0],
    [1, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 0],
    [1, 0, 1, 0,
     0, 0, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 0],
    [1, 0, 1, 0,
     0, 0, 0, 0,
     1, 0, 1, 0,
     0, 0, 0, 0],
    [1, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 1, 0,
     0, 0, 0, 0],
    [1, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 1, 0,
     0, 0, 0, 1],
    [1, 0, 1, 0,
     0, 1, 0, 1,
     1, 0, 1, 0,
     0, 0, 0, 1],
    [1, 0, 1, 0,
     0, 1, 0, 1,
     1, 0, 1, 0,
     0, 1, 0, 1],
    [1, 1, 1, 0,
     0, 1, 0, 1,
     1, 0, 1, 0,
     0, 1, 0, 1],
    [1, 1, 1, 0,
     0, 1, 0, 1,
     1, 0, 1, 1,
     0, 1, 0, 1],
    [1, 1, 1, 1,
     0, 1, 0, 1,
     1, 0, 1, 1,
     0, 1, 0, 1],
    [1, 1, 1, 1,
     0, 1, 0, 1,
     1, 1, 1, 1,
     0, 1, 0, 1],
    [1, 1, 1, 1,
     1, 1, 0, 1,
     1, 1, 1, 1,
     0, 1, 0, 1],
    [1, 1, 1, 1,
     1, 1, 0, 1,
     1, 1, 1, 1,
     0, 1, 1, 1],
    [1, 1, 1, 1,
     1, 1, 1, 1,
     1, 1, 1, 1,
     0, 1, 1, 1],
    [1, 1, 1, 1,
     1, 1, 1, 1,
     1, 1, 1, 1,
     1, 1, 1, 1]
];

// Get the state of any coordinate from a dithering matrix

function getDither(matrix, x, y) {
    return matrix[((y % 4) * 4) + (x % 4)];
}

// Gets the color in the palette which best matches the given color

function bestMatch(palette, color) {
    var best = [Infinity, [0, 0, 0]];
    for (var i = 0; i < palette.length; i += 1) {
        var difference = Math.abs(palette[i][0] - color[0]) + Math.abs(palette[i][1] - color[1]) + Math.abs(palette[i][2] - color[2]);
        if (difference < best[0]) {
            best = [difference, palette[i]];
        }
    }
    return best[1];
}

// Same as above, except excluding the color in the palette at the specified index

function bestMatchEx(palette, color, index) {
    var best = [Infinity, [0, 0, 0]];
    for (var i = 0; i < palette.length; i += 1) {
        if (i == index) {continue;}
        var difference = Math.abs(palette[i][0] - color[0]) + Math.abs(palette[i][1] - color[1]) + Math.abs(palette[i][2] - color[2]);
        if (difference < best[0]) {
            best = [difference, palette[i]];
        }
    }
    return best[1];
}

// Divides all components of a color by a given factor

function divideColor(color, factor) {
    return [color[0] / factor, color[1] / factor, color[2] / factor];
}

// Multiplies all components of a color by a given factor

function multiplyColor(color, factor) {
    return [color[0] * factor, color[1] * factor, color[2] * factor];
}

// Adds two colors together by adding their components

function addColor(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}