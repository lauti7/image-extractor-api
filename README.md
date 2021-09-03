# Image Extractor - API [![Build Status](https://app.travis-ci.com/lauti7/image-extractor-api.svg?branch=main)](https://app.travis-ci.com/lauti7/image-extractor-api)

API for [Image Extractor - Client](https://github.com/lauti7/image-extractor-client)

Given the URL of the page, list all the images that are being used and allow the user to download them.

API is online [here](https://image-extractor-api.herokuapp.com/api/status) and its browser client is online [here](https://lauti7.github.io/image-extractor-client/)

## Built with:

Typescript, Express, and Cheerio (will be replaced for Puppeteer). I am using TravisCI for CI/CD

## API allows user to:

- Get all images from any public website (server side render).
- Download an image from its link

## API:

### Get all images links from website

#### Request

`POST /api/extract/`

#### Response

Array of links

    {"images": []}

### Download single image

#### Request

`GET /api/download/single?weburl={IMAGE_LINK}`

#### Response

Returns the image. If you make a request from your browser, the image will be displayed.

In order to force downloading:

#### Request

`GET /api/download/single?weburl={IMAGE_LINK}&forceDownload=true`

#### Response

Image will be automatically downloaded.

## Instalation

You should have Node JS and NPM installed on your PC.

```bash
git clone https://github.com/lauti7/image-extractor-api.git
```

```bash
cd image-extractor-api
```

```bash
npm install
```

```bash
touch .env

vim .env

NODE_ENV=development
PORT={YOUR_PORT}

```

## TODOs:

- [x] Replace Cheerio for Puppeteer.
- [x] Support for client side render sites.
- [x] Add endpoints for downloading scrapped images.
- [ ] Allow users to download an optimized version of each scrapped image.
- [x] Add tests.
- [ ] Add Redis cache.
- [ ] Dockerize it.
