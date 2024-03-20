import FavoriteService from '../services/Favorite.js';

class FavoriteController {
    async getFavorites(ctx) {
        try {
            console.log('hi', ctx.state.user);
            const favorites = await FavoriteService.getFavorites(ctx.state.user.id)

            // console.log('=======', favorites);
            ctx.response.body = favorites;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async addFavorite(ctx) {
        try {
            const { id } = ctx.request.body
            const freshUser = await FavoriteService.addFavorite(id, ctx.state.user.id);
            ctx.response.body = freshUser;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message }
        }
    }

    async removeFavorite(ctx) {
        try {
            const { id } = ctx.params;
            const freshUser = await FavoriteService.removeFavorite(id, ctx.state.user.id);
            ctx.response.body = freshUser;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}

export default new FavoriteController();
