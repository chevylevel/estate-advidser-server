import { v2 as cloudinary } from 'cloudinary';
import '../config/cloudinary.js';

const apiSecret = cloudinary.config().api_secret;

export const signUploadForm = () => {
    const timestamp = Math.round((new Date).getTime()/1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'realty_images',
      },
      apiSecret,
    );

    return { timestamp, signature }
}
