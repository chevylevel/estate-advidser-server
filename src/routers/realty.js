import Router from '@koa/router';

import RealtyController from '../controllers/Realty.js';

const router = new Router();

router.get('/realties', RealtyController.getAll);
router.get('/realty/:id', RealtyController.getOne);
router.post('/realty', RealtyController.create);
router.put('/realty/:id', RealtyController.update);
router.put('/realty/:realtyId/:imageId', RealtyController.removeImage);
router.delete('/realty/:id', RealtyController.delete);

export default router.routes();
