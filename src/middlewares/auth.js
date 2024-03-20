import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/ApiError.js';

export const authMiddleware = (async (ctx, next) => {
    if (ctx.request.method === 'OPTIONS') {
        await next();
    }
    const token = ctx.request.headers?.authorization?.split(' ')[1] || '';

    try {
        console.log('req====', ctx.request);
        const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log('user====', user);

        ctx.state.user = user;
    } catch (error) {
        console.log('throw UnauthorizedError Bearer token verify failed ');
        throw ApiError.UnauthorizedError('Bearer token verify failed at auth middleware');
    }

    await next();
});

export default authMiddleware;


