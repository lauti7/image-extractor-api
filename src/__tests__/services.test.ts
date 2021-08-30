import axios from 'axios';
import { getAllImages } from '../services/scrapping';
import { downloadImage } from '../services/download';
import {
  HTMLresponseMock,
  imagesMock,
  URLProblemResponseMock,
} from '../__mocks__/services/scrapping';
import {
  downloadedImageURL,
  ImageDownloadResponseMock,
  downloadImageMock,
  NotImageresponseMock,
} from '../__mocks__/services/download';

jest.mock('axios');

describe('Services - Scrapping', () => {
  describe('when getAllImages is called', () => {
    it('when URL is fine, should return an array of ImageResponse', async () => {
      (axios.get as jest.Mock).mockResolvedValue(HTMLresponseMock);
      const images = await getAllImages('https://google.com');
      expect(images).toEqual(imagesMock);
    });

    it('when URL has a problem, should return an error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(URLProblemResponseMock);
      try {
        await getAllImages('https://google.com');
      } catch (error) {
        expect(error.message).toMatch(
          'there was an error with your entered URL'
        );
      }
    });
  });
});

describe('Services - Download', () => {
  describe('when downloadImage is called', () => {
    it('when URL is fine, should return an image', async () => {
      (axios.get as jest.Mock).mockResolvedValue(ImageDownloadResponseMock);
      const download = await downloadImage(downloadedImageURL);
      expect(download).toEqual(downloadImageMock);
    });

    it('when "Content-Type" header is not for image, should return an error', async () => {
      (axios.get as jest.Mock).mockResolvedValue(NotImageresponseMock);
      try {
        await downloadImage(downloadedImageURL);
      } catch (error) {
        expect(error.message).toMatch('No image in given url');
      }
    });

    it('when URL has a problem, should return an error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(URLProblemResponseMock);
      try {
        await downloadImage(downloadedImageURL);
      } catch (error) {
        expect(error.message).toMatch(
          'there was an error with your entered URL'
        );
      }
    });
  });
});
