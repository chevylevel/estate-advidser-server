import Router from '@koa/router';
import { v2 as cloudinary } from 'cloudinary';
import { signUploadForm } from '../signUploadForm.js';
import '../../config/cloudinary.js';

const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const router = new Router();

router.get('/sign-upload-form', (ctx) => {
    const sig = signUploadForm();

    ctx.response.body = {
        signature: sig.signature,
        timestamp: sig.timestamp,
        cloudname: cloudName,
        apikey: apiKey
    }
});

export default router.routes();
