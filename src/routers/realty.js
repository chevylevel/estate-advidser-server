import Router from '@koa/router';
import multer from '@koa/multer';

import RealtyController from '../controllers/Realty.js';

const upload = multer();

const router = new Router();

router.get('/realties', RealtyController.getAll);
router.get('/realties/:id', RealtyController.getOne);
router.post('/realties', upload.array(), RealtyController.create);
router.put('/realties/:id', RealtyController.update);
router.put('/realties/:realtyId/:imageId', RealtyController.removeImage);
router.delete('/realties/:id', RealtyController.delete);

export default router.routes();
