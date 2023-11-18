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
const fs = require("fs");
const sharp = require("sharp");
const recursive = require("recursive-readdir");
const IMAGES_FOLDER = "./images/";
const fromOrigianlToNewFormat = ({ imagename, format }) =>
  imagename.replace(".jpg", format);
const formats = ["jpeg", "webp", "avif"];

sharp.cache(false);

recursive(IMAGES_FOLDER, (err, files) => {
  if (err) throw new Error(err);

  const images = files.filter((file) => /\.(jpg)$/i.test(file));

  images.forEach((image) => {
    const imagename = image.split(".").slice(0, -1).join(".");

    formats.forEach(async (format) => {
      const optimizedImage = await sharp(image)[format]().toBuffer();

      const newImageName = `${imagename}.${format}`;
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

✅ images/charles-deluvio-FdDkfYFHqe4-unsplash.jpeg
✅ images/charles-deluvio-FdDkfYFHqe4-unsplash.webp
✅ images/charles-deluvio-FdDkfYFHqe4-unsplash.avif
✅ images/alex-haney-CAhjZmVk5H4-unsplash.jpeg
✅ images/alex-haney-CAhjZmVk5H4-unsplash.webp
✅ images/alex-haney-CAhjZmVk5H4-unsplash.avif
✅ images/sincerely-media-HoEYgBL_Gcs-unsplash-mobile.jpeg
✅ images/sincerely-media-HoEYgBL_Gcs-unsplash-mobile.webp
✅ images/sincerely-media-HoEYgBL_Gcs-unsplash-mobile.avif
...
```

## Change the HTML

Now, we need to update the HTML code to load the best image format.

#### Current image tag

```html
<img
  src="images/news/news-detail-header.jpg"
  class="img-fluid news-detail-image"
  alt="fine dining experience"
/>
```

#### New image tag

```html
<picture>
  <source type="image/avif" srcset="images/news/news-detail-header.avif" />
  <source type="image/webp" srcset="images/news/news-detail-header.webp" />
  <source type="image/jpeg" srcset="images/news/news-detail-header.jpeg" />
  <img
    src="images/news/news-detail-header.jpg"
    class="img-fluid news-detail-image"
    alt="fine dining experience"
  />
</picture>
```

#### Find and Replace

We can use a regular expresion to automate the changes.

**Find:**

```
<img src="(.*?)\.jpg" (.*?)>
```

**Replace:**

```
<picture>
  <source type="image/avif" srcset="$1.avif">
  <source type="image/webp" srcset="$1.webp">
  <source type="image/jpeg" srcset="$1.jpeg">
  <img loading="lazy" src="$1.jpg" $2>
</picture>
```
