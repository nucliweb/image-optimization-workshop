# Image Optimization Workshop

In this case we'll use [Cloudnary](https://cloudinary.com/) as image CDN to load the better images to improve the UX.

## Requisites

We need a Cloudinary account, the [free tier](https://cloudinary.com/pricing) it's fine to the sample.

## Upload media

After create the account, and access to the console, we'll go to **Media Library** tab and only need to do a drag and drop the images folder of the project.

## Edit images

We can edit the images format in the console and get the URL pattern to upload all the URLs references in our project.

![Edit format auto in the Cloudinary Console](https://res.cloudinary.com/nucliweb/image/upload/c_scale,f_auto,w_960/v1677315953/workshops/t3chfest-2023/assets/screenshots/format_auto.png)

## Update the HTML

Now, we need to update the HTML with the new URL to load the images via Cloudinary.

```html
<img src="https://res.cloudinary.com/nucliweb/image/upload/f_auto/v1677268466/workshops/t3chfest-2023/images/news/pablo-merchan-montes-Orz90t6o0e4-unsplash.jpg" class="img-fluid news-image" alt="">
```

## Update the CSS

```css
.BgImage {
  background-image: url('https://res.cloudinary.com/nucliweb/image/upload/f_auto/v1677268466/workshops/t3chfest-2023/images/alex-haney-CAhjZmVk5H4-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 500px;
}
```