import Router from '@koa/router';

import LocationController from '../controllers/Location.js';

const router = new Router();

router.get('/locations', LocationController.getAll);
router.post('/location', LocationController.create);
router.put('/location/:id', LocationController.update);
router.delete('/location/:id', LocationController.delete);

export default router.routes();
