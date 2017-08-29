var palette = [];

var image = new Image();

image.src = 'image.png'

image.onload = function() {
    
    // Initialize some variables
    
    var forceDither = true;
    
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    var width = image.width;
    var height = image.height;
    
    canvas.width = width;
    canvas.height = height;
    
    // Draw our image, so we can read colors from it
    
    context.drawImage(image, 0, 0);
    
    // Get the data for the image
    
    var png = context.getImageData(0, 0, width, height);
    var d = png.data;
    
    // Use the median cut algorithm to get a 16 color palette optimized for dithering
    
    palette = medianCut(rawToArray(d), 16);
    
    // Add solid white and solid black, to make an 18 color palette
    
    palette.push([0, 0, 0]);
    palette.push([255, 255, 255]);
    
    // Loop through the pixels
    
    for (var x = 0; x < width; x += 1) {
        for (var y = 0; y < height; y += 1) {
            
            var pixel = (y * width * 4) + (x * 4);
            var color = [d[pixel], d[pixel + 1], d[pixel + 2]];
            
            // Find the color in the palette that is the closest to the current pixel
            
            var closest = bestMatch(palette, color);
            
            // Say that the previously found color did not exist, which color would be closest then
            
            var closest2 = bestMatchEx(palette, color, palette.indexOf(closest));
            
            var between;
            
            if (forceDither == true) {
                
                // Don't use texture 1 and 17, so solid colors don't occur
                
                between = [[Infinity, Infinity, Infinity]];
            
                // Get the 15 colors between the two previously found colors
            
                for (var b = 1; b < 15; b += 1) {
                    between.push(addColor(closest, multiplyColor(divideColor(closest2, 17), b)));
                }
            
                between.push([Infinity, Infinity, Infinity]);
                
            } else {
                
                // Use all textures
                
                between = [];
            
                // Get the 17 colors between the two previously found colors
            
                for (var b = 0; b < 17; b += 1) {
                    between.push(addColor(closest, multiplyColor(divideColor(closest2, 17), b)));
                }
                
            }
            
            // Get the closest shade to the current pixel from the new 15 colors
            
            var closest3 = bestMatch(between, color);
            var index3 = between.indexOf(closest3);
            
            // Use the dithering matrix that is based on the closest shade and pick the color
            
            var trans = [closest, closest2][getDither(dither[index3], x, y)];
            
            // Apply the color to the image with full opacity
            
            d[pixel] = trans[0];
            d[pixel + 1] = trans[1];
            d[pixel + 2] = trans[2];
            d[pixel + 3] = 255;         
        }
    }
    
     context.putImageData(png, 0, 0);
}