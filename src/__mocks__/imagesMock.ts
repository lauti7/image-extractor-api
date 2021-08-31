import { ImageResponse, DownloadedImage } from '../utils/interfaces';

const imageBase64 =
  'EelFtyCqVxmutitYfxS0vn2cLRzmOhEUk5uN20i9vcb4jMr4rWOvhyzMxHBmLwCaIIWMcykAtpYgXZbjUlgwuptYg4znn2Y9p2b5dHFkfEeW5LTMtqx6Ok0zv5nWxZrbclI8sBXGnC/HUlJk1Hm2c1D1ckhqMteiUQX5EOWBJ228V9thvtg0UbXDMXIUuIe14a1q2b3tbSzvLw80ag+JqSY2jk/2kfcY/I9QOeInLe1PIuMcumbI5EraqKSSGWKOVS9NKpKsH32tb73IjcXvimZv/aTWZUlKeLnVjT93LPDQxRytdbE67cz5ix688UJwL2XTVOZzuiTU5pZWhEolKElTY7g44NaWkk0rumeHNpt/hXL2l9rtB2c9qmVGiWSrabLlTPlpyGZSG+ykA5Fwt7qbXXT1tjjt77QOzvjrsMgPD/EVNW8WU2eRVENPGjCaW6Orgoy3WMRte/LUtr3OKu4t7NxlvEFLT5cJHfMFZ9LG5DggOSx3tve5wScQ9jmV8LdnI4gq66ebM6ivhgpvFpjdDfWunmbBWIN+mGEDYm05u9JZiZcQ9rmu+G1nH2qpGnVDH6k06/0x4a+RecEBt50yi35YsgUdKLCOGNyfPe3zx01PRquk0kRYeYxvEtpR1aEsh7Qs+4Xhlp8kqYaOnlkEkkSwgoz2te3u2wQx9uHF4Wz1dJLb+elU/vhf2WntdKWIeewOOFpYGAU0sWkX3Mak4K2Zw0CE6Fh1ISw7b+IZmVqmny6UiwB7rTYDpsMN6rtSnri8lZltOSws/dylQRa1uWPZKOmp0LCCFGPNu7G3wxHSUFPUW1UcekEnZB+eCf3D+9U/t2dy2jlSmOEMQFCISSemxOMwLkJijWKZ44pF8LEKLg9caTd5BkteVIV/Zpbb/wCk4ozO6aVc2rvCAskzNEosAFazL+RxicFobdoZbJIKcLIlS4lRgwdbqyEG4II6g7i2PFy+kkdqiVu8ke7OzHUWYm5Jv1xJNBFEqGph1auRLE3w1kqKONnEUdhcbAWtgaILSQp4YlBjRVN76dIuB06YUgLbKIyA199tsKd7C4kYKdSFdr7m9/6Y69pjBB0Nvy3tiSpSdmK2sw/c9cHvZnxcMhzmnpMwBFG8hF72KMenuP64C1qo2t3qEk4ciWmlfZPQ353xRzQ4UVZjiw2Fr6KeGRAyeJGFwb3wozRtfT8bYofgntOOWMlDnbNNSuwCTAEspPQjrvi4Ys3hlRWhbUjcjpIvha5paaKcRvDxYUuWjvcAHH60eo6vyGI9a9Tb+mF46xLWY3v6HFUROXjibfSD8MJkRjYwobbcsde0IT1ueWEnkC2K/pjrU6hcBaVyW0eLcbLywjNSQ1LXaEDpa3LCrOqAlwCfMC18JrVLyDF+m43xGigkpFMupobERgX9MKR5Vl891qKWOQg3uRc45eSPYSagpPQ4WSZQWETeLY3ta4x2hXWUPZzkogkZsvjUEg2DLsB7seUeV1mYVNPmGfze218dJFSpI4A0QxjwoANgB+eCSphBIaKQknchhhjPRPUNHG0hSnbd1XYv6E+WKVRRiM2qjKtKutkelyO0a7rJVEXCjqF8zz36YTbg2moqCNAzJIqkrYWLHr/XBIKqPL4xpAUILBQuGsonzNXcDuo2/ED4z8emLED1XC/RV9FljZ1xJLXTIDT0kK06tbmRu5+LfpgE7as6kEmU8O00haGh1Vbpz7t5BZVt/tuf+rFocTcSUnBeQVNUIgzoRFBEVJDyte2r0FiT529cZpzHMnzGsqKutmM1TUuZJXYffY/3yxow8Z+JY8XMAMlKMCNYsOvIBd8dRsshIcEDnywspBOw1La4BwrDckE35dDfkcMQ02k7jQXCQAkaFa/U46dwiEvGCAORXmcOtXdJqI1Ebj34jpHlqdLlAwHIk74NshjtJhUtLVPq0IFB+7juGMpswVgOmHixABTJZb/6RvhaOJGW/hY+drEfliAFewF//9k=';

export const imageBuffer = Buffer.from(imageBase64, 'base64');

export const imagesMock: ImageResponse[] = [
  {
    name: 'image_mock_1',
    fileName: 'image_mock_1.png',
    url: 'http://google.com/image_mock_1.png',
    type: '.png',
  },
];

export const downloadedImageMock: DownloadedImage = {
  image: imageBuffer,
  contentType: 'image/png',
  type: '.png',
  name: 'image_mock_1',
  fileName: 'image_mock_1.png',
};
