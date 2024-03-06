import Realty from '../models/Realty.js';
import { v2 as cloudinary } from 'cloudinary';

class RealtyService {

    getRealtyData = (realty) => ({
        ...realty,
        isPossibleToStay: !!realty?.isPossibleToStay,
        withView: !!realty.withView,
        withInstallment: !!realty.withInstallment,
    })

    async create(realty) {
        const images = JSON.parse(realty?.images || null) || [];

        return await Realty.create({
            ...this.getRealtyData(realty),
            images
        });
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

    async update(id, payload) {
        if (!id) {
            throw new Error('wrong id');
        }

        const parsedImages = JSON.parse(payload.images) || [];

        delete payload.images;

        return await Realty.findByIdAndUpdate(
            id,
            {
                ...this.getRealtyData(payload),
                $push: { images: { $each: parsedImages } },
            },
            { new: true },
        );
    }

    async removeImage(realtyId, imageId) {
        if (!realtyId || !imageId) {
            throw new Error('wrong id');
        }

        try {
            const destroyResponse = cloudinary.uploader.destroy(imageId);
            const updateResponse = Realty.findByIdAndUpdate(
                realtyId,
                {
                    $pull: { images: { _id: [imageId] }},
                },
                { new: true },
            );

            const [destroyed, updated] = await Promise.all([destroyResponse, updateResponse]);

            return updated;
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        try {
            return await Realty.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new RealtyService();
