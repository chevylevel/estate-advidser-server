import Router from '@koa/router';
import multer from '@koa/multer';

import RealtyController from './RealtyController.js';
import FileService from './services/FileService.js';

const storage = multer.diskStorage({
    destination: 'static',
    filename: FileService.generateFileName,
})

const upload = multer({ storage });

const router = new Router({ prefix :'/api' });

router.get('/realties', RealtyController.getAll);
router.get('/realties/:id', RealtyController.getOne);
router.post('/realties', upload.array('images'), RealtyController.create);
router.put('/realties/:id', upload.array('images'), RealtyController.update);
router.put('/realties/:id/:image', RealtyController.removeImage);
router.delete('/realties/:id', RealtyController.delete);

export default router;
