import Realty from '../models/Realty.js';
import FileService from './FileService.js';

class RealtyService {
    async create(realty, picture) {
        return await Realty.create({ ...realty, picture: picture.filename });
    }

    async getOne(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        return await Realty.findById(id);
    }

    async getAll() {
        return await Realty.find();
    }

    async update(id, realty) {
        if (!id) {
            throw new Error('wrong id');
        }

        return await Realty.findByIdAndUpdate(id, realty, { new: true });
    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        return await Realty.findByIdAndDelete(id);
    }

}

export default new RealtyService();
