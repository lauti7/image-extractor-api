interface Image {
  name: string;
  fileName: string;
  type: string;
}

export interface ImageResponse extends Image {
  url: string;
}

export interface DownloadedImage extends Image {
  image: Buffer;
  contentType: string;
}
