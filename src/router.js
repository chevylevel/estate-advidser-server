import Router from '@koa/router';
import multer from '@koa/multer';

import RealtyController from './RealtyController.js';
import FileService from './services/FileService.js';

const storage = multer.diskStorage({
    destination: 'static',
    filename: FileService.saveFile
})

const upload = multer({ storage });

const router = new Router({ prefix :'/api' });

router.get('/realties', RealtyController.getAll);
router.get('/realties/:id', RealtyController.getOne);
router.post('/realties', upload.single('picture'), RealtyController.create);
router.put('/realties/:id', RealtyController.update);
router.delete('/realties/:id', RealtyController.delete);

export default router;
