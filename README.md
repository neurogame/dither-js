# dither-js
Dithering and image quantifying 

## Functionality
 - Quantize images using a modified and original modification of the median cut algorithm
 - Dither images using 4 x 4 matrices, including the original matrix from 1973
 - Works exceptionally well when using only black and white (2 color dithering)

## Using `quantize.js`
Get data from your canvas like this `rawToArray(canvas.getContext('2d').getImageData(0, 0, width, height).data)`. Now to get a palette with optimized colors from this data, use the `medianCut` function like this `medianCut(data, 16)` where `data` is the data you just aquired from the canvas, and 16 is the number of colors in your output palette. Remember, the output palette length must be a power of 2 for this to work.

## Using `dither.js`
I would highly recommend using the example in `convert.js`. It is very well commented and nicely coded. But, you can read on if you like techical information more :)

Get data from the canvas (which has your desired image on it) like this `canvas.getContext('2d').getImageData(0, 0, width, height).data`. Loop through the pixels (not the data), by using an `x` loop and a `y` loop. The index in the data can be calculated by this formula `(y * width * 4) + (x * 4)`. Then you can make a color object like this `[data[index], data[index + 1], data[index + 2]]`. Now you can find the most similar color using `bestMatch()`. Then you can find the second most similar color using `bestMatchEx()`. Using these colors, you can find the 17 colors in between, using the basic algorithm. You can then find the most similar color to the current pixel from the 17 new colors by using `bestMatch()` again. The index of this color will be the index of the dithering matrix. Now you can find the final color by using `[closestMatch, secondClosestMatch][getDither(dither[betweenIndex], x, y)]`. Apply this color to the canvas.

## Simple usage and examples

You can find a great example in `convert.js`. You can see a demo here. And there are some screenshots too

![Black and white watermelons](https://raw.githubusercontent.com/neurogame/dither-js/master/screenshots/watermelon.png)
![Black and white portal cube](https://raw.githubusercontent.com/neurogame/dither-js/master/screenshots/portal_cube.png)

## Developer's note
I made this in two days, and I have only been doing Javascript for 2 weeks maybe. I hope you enjoy, and please correct me and help me if you see anything that needs improvement in my code! Enjoy! :)
