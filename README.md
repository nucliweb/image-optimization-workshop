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

## Change the CSS background images

Now, we can to update the CSS code to load the best image format... we'll need a little JS polyfil.

#### Add the next code to the end of the `<body>`

> These polyfills are from [webp-in-css](https://github.com/ai/webp-in-css) and [avif-in-css](https://github.com/nucliweb/avif-in-css) PostCSS plugins

```html
<script>
  {
    let i = new Image();
    i.onload = i.onerror = (_) => {
      document.body.classList.add(i.height > 0 ? "avif" : "no-avif");
    };
    i.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  }
  {
    document.body.classList.remove("no-js");
    var i = new Image();
    i.onload = i.onerror = function () {
      document.body.classList.add(i.height == 1 ? "webp" : "no-webp");
    };
    i.src =
      "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  }
</script>
```

#### Update the CSS

Search the selector `.site-about-header` and add below the next code.

```css
body.webp .site-about-header {
  background-image: url("../images/header/briana-tozour-V_Nkf1E-vYA-unsplash.webp");
}

body.avif .site-about-header {
  background-image: url("../images/header/briana-tozour-V_Nkf1E-vYA-unsplash.avif");
}
```
