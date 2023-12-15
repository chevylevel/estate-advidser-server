import Realty from '../models/Realty.js';
import { v2 as cloudinary } from 'cloudinary';

class RealtyService {
    async create(realty) {
        const images = JSON.parse(realty?.images);
        return await Realty.create({...realty, images});
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

        const images = JSON.parse(realty?.images) || [];

        return await Realty.findByIdAndUpdate(
            id, {
                ...realty,
                $push: { images: { $each: images }},
            },
            { new: true }
        );
    }

    async removeImage(realtyId, imageId) {
        if (!id || !imageId) {
            throw new Error('wrong id');
        }

        try {
            const destroyResponse = cloudinary.uploader.destroy(imageId);
            const updateResponse = Realty.findByIdAndUpdate(
                id,
                {
                    $pull: { images: { _id: [imageId] }},
                },
                { new: true },
            );

            const [destroyed, updated] = await Promise.all([destroyResponse, updateResponse]);

            return updated;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        try {
            return await Realty.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new RealtyService();
