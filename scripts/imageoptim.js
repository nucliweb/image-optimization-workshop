const fs = require('fs')
const sharp = require('sharp')
const recursive = require('recursive-readdir')
const IMAGES_FOLDER = './images/'
const fromJpegToWebpExt = (image) => image.replace('.jpg', '.webp')

sharp.cache(false)

recursive(IMAGES_FOLDER, (err, files) => {
  if (err)
    throw new Error(err)

  const images = files.filter(file => /\.(jpg)$/i.test(file))

  images.forEach(async image => {
    const optimizedImage = await sharp(image)
      .webp({ effort: 6 })
      .toBuffer()

    const webpImage = fromJpegToWebpExt(image)
    fs.writeFile(webpImage, optimizedImage, (err) => {
      if (err)
        console.error(err)

      console.log('✅', webpImage)
    })
  })
})

