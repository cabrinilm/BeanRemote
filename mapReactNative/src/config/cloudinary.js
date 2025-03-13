import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo',
  },
  url: {
    secure: true,
  },
});

export default cld;
