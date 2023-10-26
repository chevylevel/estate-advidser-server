import Koa from 'koa';
import mongoose from 'mongoose';
import bodyparser from 'koa-bodyparser';
import serve from 'koa-static';
import cors from '@koa/cors';

import apiRouter from './src/router.js';

const DB_URL = 'mongodb+srv://chevylevel:D4lli92QDYyid1ZR@e-adviser.qprak4y.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

const app = new Koa();

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, console.log(`server is running on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

app.use(serve('static'));
app.use(cors());
app.use(bodyparser());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

startApp();
