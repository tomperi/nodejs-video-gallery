# Description

Basic video gallery backend using [Nest](https://github.com/nestjs/nest) framework.

## Features 

This gallery allows the user to upload video files that will be stored locally. The system will generate a thumbnail for every uploaded video using [Fluent-FFMPEG](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## APIs

`GET /gallery`
```json
{
  "videos": [
    {
      "id": "6d5679cc-fd85-4cbf-a649-d95869d8e39b",
      "name": "first gallery video",
      "description": "this is the first video in this gallery!",
      "videoFilename": "gallery/video/6d5679cc-fd85-4cbf-a649-d95869d8e39b",
      "thumbnailFilename": "gallery/thumbnail/6d5679cc-fd85-4cbf-a649-d95869d8e39b",
      "uploadDate": "2021-10-16T22:41:00.788Z"
    }
  ]
}
```

`POST /gallery`
```json
{
  "name": "give your video a name",
  "description": "give your video a description",
  "file": <video file upload>,
}
```
Will return the saved video id
```json
{
  "id": "6d5679cc-fd85-4cbf-a649-d95869d8e39b"
}
```

`GET /gallery/video/{id}` will return the video file 

`GET /gallery/thumbnail/{id}` will return the video thumbnail 

## Requirements
In order for the image processing to work, FFMPEG must be install on your system.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Credits

The gallery comes preloaded with a single video by [Ruvim Miksanskiy](https://www.pexels.com/video/vista-house-aerial-view-5573504/)