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

