import Router from '@koa/router';

import authRouter from './routers/auth.js';
import realtyRouter from './routers/realty.js';
import signUploadFormRouter from './routers/signUploadForm.js';

const router = new Router();

router
    .use(authRouter)
    .use(realtyRouter)
    .use(signUploadFormRouter);

export default router;
