import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/ApiError.js';

export const authMiddleware = (async (ctx, next) => {
    if (ctx.request.method === 'OPTIONS') {
        await next();
    }
    const token = ctx.request.headers?.authorization?.split(' ')[1] || '';

    try {
        const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        ctx.state.user = user;
    } catch (error) {
        throw ApiError.UnauthorizedError('Bearer token verify failed at auth middleware');
    }

    await next();
});

export default authMiddleware;


