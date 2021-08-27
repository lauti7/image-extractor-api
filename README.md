# Image Extractor - API

Given the URL of the page, list all the images that are being used and allow the user to download them.
Only works with server side render sites for now.

## Built with:

Typescript, Express, and Cheerio (will be replaced for Puppeteer)

## User Can:

- Get all images from a website.

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

- [ ] Replace Cheerio for Puppeteer.
- [ ] Support for client side render sites.
- [x] Add endpoints for downloading scrapped images.
- [ ] Allow users to download an optimized version of each scrapped image.
- [ ] Add tests.
- [ ] Add Redis cache.
- [ ] Dockerize it.
