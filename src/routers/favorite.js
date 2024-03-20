import Router from '@koa/router';
import FavoriteController from '../controllers/Favorite.js';
import authMiddleware from '../middlewares/auth.js';

const router = new Router();

router.get('/favorites', authMiddleware, FavoriteController.getFavorites);
router.post('/favorite', authMiddleware, FavoriteController.addFavorite);
router.delete('/favorite/:id', authMiddleware, FavoriteController.removeFavorite);

export default router.routes();
