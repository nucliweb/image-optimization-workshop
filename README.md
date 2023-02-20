# Image Optimization Workshop

## Prerequisites

To optimize the images we'll use some npm packages, so we need installed in our system [Node.js](https://nodejs.org/) and some Node.js package manager, we'll use npm in the samples.

## Initialize npm project

We need to initialize a npm project to install the npm dependencies and create scripts.


```bash
npm init -y
```

## Install dependencies

We'll use [sharp](https://sharp.pixelplumbing.com/) to optimize images and [recursive-readdir](https://github.com/jergason/recursive-readdir) to list all images in the project.

```bash
npm install -d sharp recursive-readdir
```

> With the flag `-d` we'll install packages as a devDependencies, we don't need theses tools in production 

## Create the script

Create the script `scripts/imageoptim.js` to use the installed packages and optimize the images.

```js
const fs = require('fs')
const sharp = require('sharp')
const recursive = require('recursive-readdir')
const IMAGES_FOLDER = './images/'
sharp.cache(false)

recursive(IMAGES_FOLDER, (err, files) => {
  if (err)
    throw new Error(err)

  const images = files.filter(file => /\.(jpg)$/i.test(file))

  images.forEach(async image => {
    const optimizedImage = await sharp(image)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    fs.writeFile(image, optimizedImage, (err) => {
      if (err)
        console.error(err)

      console.log('✅', image)
    })
  })
})
```

## Add a new npm script

Now, we can add a new npm script to call the process to optimize the images with `npm run imageoptim`

```json
{
   "scripts": {
    "imageoptim": "node ./scripts/imageoptim.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

## Optimize all images

Run the npm script with command `npm run imageoptim` to optimize all images.

> Output

```bash
> image-optimization-workshop@1.0.0 imageoptim
> node ./scripts/imageoptim.js

✅ images/charles-deluvio-FdDkfYFHqe4-unsplash.jpg
✅ images/sincerely-media-HoEYgBL_Gcs-unsplash-mobile.jpg
✅ images/sincerely-media-HoEYgBL_Gcs-unsplash.jpg
✅ images/lunch/farhad-ibrahimzade-D5c9ZciQy_I-unsplash.jpg
✅ images/alex-haney-CAhjZmVk5H4-unsplash.jpg
...
```
