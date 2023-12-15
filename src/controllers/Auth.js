import authService from '../services/Auth.js';

class AuthController  {
    async signUp(ctx) {
        const {
            email,
            password,
        } = ctx.request.body;

        const {
            user,
            refreshToken,
            accessToken,
        } = await authService.signUp(email, password);

        ctx.cookies.set('refreshToken', refreshToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        );

        ctx.response.body = {
            message: 'Пользователь успешно зарегистрирован',
            user,
            refreshToken,
            accessToken,
        };
    }

    async signIn(ctx) {
        const { email, password } = ctx.request.body;

        const {
            refreshToken,
            accessToken,
            user,
        } = await authService.signIn(email, password);

        ctx.cookies.set('refreshToken', refreshToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        );

        ctx.response.body = {
            refreshToken,
            accessToken,
            user,
        };
    }

    async signInWithGoogle(ctx) {
        const token = ctx.request.body;

        console.log('token.token', token);

        const {
            refreshToken,
            accessToken,
            user,
        } = await authService.signInWithGoogle(token);

        ctx.cookies.set('refreshToken', refreshToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        );

        ctx.response.body = {
            refreshToken,
            accessToken,
            user,
        };
    }

    async signOut(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken');

        await authService.signOut(refreshToken);

        ctx.cookies.set('refreshToken', '');
        ctx.response.status = 200;
    }

    async activateAccount(ctx) {
        const activationKey = ctx?.params?.key;

        await authService.activateAccount(decodeURIComponent(activationKey));

        ctx.response.body = 'Success activation';
        ctx.response.redirect(process.env.CLIENT_URL)
    }

    async refresh(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken');

        const{
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
            user,
        } = await authService.refresh(refreshToken);

        ctx.cookies.set('refreshToken', newRefreshToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        );

        ctx.response.body = {
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
            user,
        };
    }

    async getUsers(ctx) {
        ctx.response.body = await authService.getUsers();
    }
}

export default new AuthController();
