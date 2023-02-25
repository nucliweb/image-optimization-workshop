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

Create the script `scripts/formats.js` to define the formats and image sizes.

```js
const formats = [
  // jpeg
  { width: 640, format: "jpeg", suffix: "-640" },
  { width: 768, format: "jpeg", suffix: "-768" },
  { width: 1024, format: "jpeg", suffix: "-1024" },
  // webp
  { width: 640, format: "webp", suffix: "-640" },
  { width: 768, format: "webp", suffix: "-768" },
  { width: 1024, format: "webp", suffix: "-1024" },
  // avif
  { width: 640, format: "avif", suffix: "-640" },
  { width: 768, format: "avif", suffix: "-768" },
  { width: 1024, format: "avif", suffix: "-1024" },
];

module.exports = {
  formats,
};
```

Create the script `scripts/imageoptim.js` to use the installed packages and optimize the images.

```js
const fs = require("fs");
const sharp = require("sharp");
const recursive = require("recursive-readdir");
const IMAGES_FOLDER = "./images/";
const fromOrigianlToNewFormat = ({ imagename, format }) =>
  imagename.replace(".jpg", format);
const { formats } = require("./formats");

sharp.cache(false);

recursive(IMAGES_FOLDER, (err, files) => {
  if (err) throw new Error(err);

  const images = files.filter((file) => /\.(jpg)$/i.test(file));

  images.forEach((image) => {
    const imagename = image.split(".").slice(0, -1).join(".");

    formats.forEach(async ({ width, format, suffix }) => {
      const optimizedImage = await sharp(image)
        [format]()
        .resize(width)
        .toBuffer();

      const newImageName = `${imagename}${suffix}.${format}`;
      fs.writeFile(newImageName, optimizedImage, (err) => {
        if (err) console.error(err);

        console.log("✅", newImageName);
      });
    });
  });
});
```

## Add a new npm script

Now, we can add a new npm script to call the process to optimize the images with `npm run imageoptim`

```json
{
  "scripts": {
    "imageoptim": "node ./scripts/imageoptim.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Optimize all images

Run the npm script with command `npm run imageoptim` to optimize all images.

> Output

```bash
> image-optimization-workshop@1.0.0 imageoptim
> node ./scripts/imageoptim.js

✅ images/alex-haney-CAhjZmVk5H4-unsplash-640.jpeg
✅ images/alex-haney-CAhjZmVk5H4-unsplash-768.jpeg
✅ images/alex-haney-CAhjZmVk5H4-unsplash-1024.jpeg
✅ images/alex-haney-CAhjZmVk5H4-unsplash-640.webp
✅ images/alex-haney-CAhjZmVk5H4-unsplash-768.webp
✅ images/alex-haney-CAhjZmVk5H4-unsplash-1024.webp
✅ images/alex-haney-CAhjZmVk5H4-unsplash-640.avif
✅ images/alex-haney-CAhjZmVk5H4-unsplash-768.avif
✅ images/alex-haney-CAhjZmVk5H4-unsplash-1024.avif
...
```

## Update the HTML to load the responsive images

Now, we need to update the HTML to load the responsive images, we can do it with the next code:

```html
<picture>
  <source
    sizes="(min-width: 768px) 100vw, 768px,
           (min-width: 1024px) 100vw, 1024px"
    srcset="
      images/alex-haney-CAhjZmVk5H4-unsplash-768.avif   768w,
      images/alex-haney-CAhjZmVk5H4-unsplash-1024.avif 1024w
    "
    type="image/avif"
  />
  <source
    sizes="(min-width: 768px) 100vw, 768px,
           (min-width: 1024px) 100vw, 1024px"
    srcset="
      images/alex-haney-CAhjZmVk5H4-unsplash-768.webp   768w,
      images/alex-haney-CAhjZmVk5H4-unsplash-1024.webp 1024w
    "
    type="image/webp"
  />
  <source
    sizes="(min-width: 768px) 100vw, 768px,
           (min-width: 1024px) 100vw, 1024px"
    srcset="
      images/alex-haney-CAhjZmVk5H4-unsplash-768.jpeg   768w,
      images/alex-haney-CAhjZmVk5H4-unsplash-1024.jpeg 1024w
    "
    type="image/jpeg"
  />
  <img
    src="images/alex-haney-CAhjZmVk5H4-unsplash-640.jpeg"
    height="300"
    width="200"
    alt="Awesome image"
  />
</picture>
```

## CSS Responsive images

To load the responsive images from the CSS, we can use the rule `@media`

```css
.site-about-header {
  background-image: url('../images/header/briana-tozour-V_Nkf1E-vYA-unsplash.jpeg');
}

@media screen and (min-width: 768px) {
  .site-about-header {
    background-image: url('../images/header/briana-tozour-V_Nkf1E-vYA-unsplash-768.jpeg');
  }
}

@media screen and (min-width: 1024px) {
  .site-about-header {
    background-image: url('../images/header/briana-tozour-V_Nkf1E-vYA-unsplash-1024.jpeg');
  }
}
```