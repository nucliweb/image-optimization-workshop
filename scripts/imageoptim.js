const fs = require('fs')
const sharp = require('sharp')
const recursive = require('recursive-readdir')
const IMAGES_FOLDER = './images/'
const fromOrigianlToNewFormat = ({ imagename, format }) => imagename.replace('.jpg', format)
const formats = ['jpeg', 'webp', 'avif']

sharp.cache(false)

recursive(IMAGES_FOLDER, (err, files) => {
  if (err)
    throw new Error(err)

  const images = files.filter(file => /\.(jpg)$/i.test(file))

  images.forEach(image => {
    const imagename = image.split('.').slice(0, -1).join('.')

    formats.forEach(async format => {

      const optimizedImage = await sharp(image)
      [format]()
        .toBuffer()

      const newImageName = `${imagename}.${format}`
      fs.writeFile(newImageName, optimizedImage, (err) => {
        if (err)
          console.error(err)

        console.log('✅', newImageName)
      })
    })
  })
})

