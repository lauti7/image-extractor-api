# Image Scrapper - API

Given the URL of the page, list all the images that are being used and allow the user to download them.
Only works with server side render sites for now.

## Built with:

Typescript, Express, and Cheerio (will be replaced for Puppeteer)

## User Can:

- Get all images from a website.

## API:

### Get all images links from website

#### Request

`POST /api/scrape/`

    curl -i -H 'Content-Type: application/json' -d '{"weburl": "YOUR_URL"}' -X POST  http://localhost:{YOUR_HOST}/api/scrape

#### Response

Array of links

    {"images": []}

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

## TODOs:

- [ ] Replace Cheerio for Puppeteer.
- [ ] Support for client side render sites.
- [ ] Add endpoints for downloading scrapped images.
- [ ] Allow users to download an optimized version of each scrapped image.
- [ ] Add tests.
- [ ] Add Redis cache.
- [ ] Dockerize it.
