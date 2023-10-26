import * as uuid from 'uuid';

class FileService {
    saveFile(req, file, cb) {
        const fileName = uuid.v4() + '.' + file.mimetype.split('/')[1];
        cb(null, fileName)
    }
}

export default new FileService();
