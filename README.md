# Image Optimization Workshop

## Video optimization

We can use [Cloudinary](https://cloudinary.com/) to load a better video format.

Like the images, with the console we can edit video to select format auto and get the URL.

## Update the HTML

> `f_auto,q_auto`

```html
<video autoplay="" loop="" muted="" class="custom-video" poster="">
  <source
    src="https://res.cloudinary.com/nucliweb/video/upload/f_auto,q_auto/v1677268438/workshops/t3chfest-2023/video/production_ID_3769033.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>
```
