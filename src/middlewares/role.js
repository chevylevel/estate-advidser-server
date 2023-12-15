import ApiError from '../exceptions/ApiError.js';

export const roleMiddleware = (allowedRoles) => (async (ctx, next) => {
    if (ctx.request.method === 'OPTIONS') {
        await next();
    }

    const userRoles = ctx?.request?.user?.roles || [];

    const isRoleHasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!isRoleHasAccess) {
        throw ApiError.BadRequestError('У аккаунта нет доступа');
    }

    await next();
});

export default roleMiddleware;
