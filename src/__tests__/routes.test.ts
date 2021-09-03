import testServer from '../utils/testServer';
import extractAPI from '../routes/scrapping';
import { getAllImages } from '../services/scrapping';
import { downloadImage } from '../services/download';
import { downloadedImageMock, imagesMock } from '../__mocks__/imagesMock';
import downloadAPI from '../routes/download';

jest.mock('../services/scrapping');

describe('Routes - Extract API', () => {
  const request = testServer(extractAPI);
  it('POST / with weburl key - should return 200 and a list of images', (done) => {
    (getAllImages as jest.Mock).mockResolvedValue(imagesMock);
    request
      .post('/api/extract')
      .type('json')
      .send({
        weburl: 'https://en.wikipedia.org/wiki/Cat',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ images: imagesMock, message: '' });
        done();
      });
  });

  it('POST / with weburl which does not have images - should return 200 with an empty list of images and a message ', (done) => {
    (getAllImages as jest.Mock).mockResolvedValue([]);
    request
      .post('/api/extract')
      .type('json')
      .send({
        weburl: 'https://en.wikipedia.org/wiki/Cat',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          images: [],
          message: 'no image on your entered URL',
        });
        done();
      });
  });

  it('POST / without weburl key - should return 400 with an error key, an empty list of images and a message', (done) => {
    request
      .post('/api/extract')
      .type('json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          images: [],
          error: true,
          message: 'weburl is missing',
        });
        done();
      });
  });

  it('POST / with a problem in given URL - should return 500 with an error key, an empty list of images and a message', (done) => {
    (getAllImages as jest.Mock).mockRejectedValue(
      new Error('Server internal error')
    );
    request
      .post('/api/extract')
      .type('json')
      .send({
        weburl: 'https://en.wikipedia.org/wiki/Cat',
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          images: [],
          error: true,
          message: 'Server internal error',
        });
        done();
      });
  });

  it('POST / with an invalid url - should return 400 with an error key and a message', (done) => {
    request
      .post('/api/extract')
      .type('json')
      .send({
        weburl: '//invalidurl.c',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          error: true,
          message: 'weburl parameter is not a valid URL',
        });
        done();
      });
  });
});

jest.mock('../services/download');

describe('Routes - Download API', () => {
  const request = testServer(downloadAPI);

  it('GET /single with weburl in query - should return 200 and an image', (done) => {
    (downloadImage as jest.Mock).mockResolvedValue(downloadedImageMock);
    request
      .get(
        '/api/download/single?weburl=https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cat_poster_1.jpg/260px-Cat_poster_1.jpg'
      )
      .expect('Content-Type', /image/)
      .expect(200, done);
  });

  it('GET /single with forceDownload - should return 200 and an attachment', (done) => {
    (downloadImage as jest.Mock).mockResolvedValue(downloadedImageMock);
    const donwloadedImageName = `${downloadedImageMock.name}.${downloadedImageMock.type}`;
    const nameRegex = new RegExp(donwloadedImageName);
    request
      .get(
        '/api/download/single?weburl=https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cat_poster_1.jpg/260px-Cat_poster_1.jpg&forceDownload=true'
      )
      .expect('Content-type', /plain/)
      .expect('Content-disposition', nameRegex, done);
  });

  it('GET /single without weburl in query - should return 400', (done) => {
    request
      .get('/api/download/single')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          error: true,
          message: 'weburl parameter is missing',
        });
        done();
      });
  });

  it('GET /single with an URL which does not return an image - should return 500', (done) => {
    (downloadImage as jest.Mock).mockResolvedValue({});
    request
      .get(
        '/api/download/single?weburl=https://es.wikipedia.org/wiki/Cristina_Fern%C3%A1ndez_de_Kirchner'
      )
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          error: true,
          message:
            'something went wrong while getting your image. Is it the correct url?',
        });
        done();
      });
  });

  it('GET /single with an invalid URL - - should return 400 with an error key and a message', (done) => {
    (downloadImage as jest.Mock).mockResolvedValue({});
    request
      .get('/api/download/single?weburl=//invalidurl.c')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({
          error: true,
          message: 'weburl parameter is not a valid URL',
        });
        done();
      });
  });
});
