import ApiError from '../exceptions/ApiError.js';

export const errorMiddleware = (async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof ApiError) {
            ctx.response.status = error.status;

            ctx.response.body = {
                message: error.message,
                errors: error.errors,
            }

            return;
        }

        ctx.response.status = 500;
        ctx.response.body = { message: `Непредвиденная ошибка, ${error.message}` }

        console.error(error);
    }
});

export default errorMiddleware;
