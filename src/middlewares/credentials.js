import ApiError from '../exceptions/ApiError.js';
import { check } from '../validators.js';

export const credentialsMiddleware = (async (ctx, next) => {
    const {
        email,
        password,
    } = ctx.request.body;

    if (!check(email).isEmail()) {
        throw ApiError.BadRequestError('Некорректный email');
    }

    if (!check(password).isLength({ min: 4 })) {
        throw ApiError.BadRequestError('Пароль должен содержать минимум 4 символа');
    }

    await next();
});

export default credentialsMiddleware;
