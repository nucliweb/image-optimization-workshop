# Image Optimization Workshop

## Video Optimization

To convert the video format we'll use [ffmpeg](), you can access to [install documentation]() to install in your operating system.

## H264 format

```bash
ffmpeg -i production_ID_3769033.mp4 -vcodec h264 -acodec mp3 production_ID_3769033-h264.mp4
```

## H265 format 

```bash
ffmpeg -i production_ID_3769033.mp4 -c:v libx265 -preset fast -crf 28 -tag:v hvc1 -c:a eac3 -b:a 224k  production_ID_3769033-libx265.mp4
```

## Check the weight

```bash
1.4M production_ID_3769033.mp4
1.1M production_ID_3769033-h264.mp4
418K production_ID_3769033-libx265.mp4
```

## Update the HTML

Now, we'll update the HTML to load the better format.

```html

```