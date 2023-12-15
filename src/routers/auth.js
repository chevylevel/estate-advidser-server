import Router from '@koa/router';
import AuthController from '../controllers/Auth.js';
import credentialsMiddleware from '../middlewares/credentials.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';

const router = new Router();

router.post('/signup', credentialsMiddleware, AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/signin-with-google', AuthController.signInWithGoogle);
router.get('/signout', AuthController.signOut);
router.get('/activate/:key', AuthController.activateAccount);
router.get('/refresh', AuthController.refresh);
router.get('/users', authMiddleware, roleMiddleware(['admin']), AuthController.getUsers);

export default router.routes();
