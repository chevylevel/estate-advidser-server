import Realty from '../models/Realty.js';
import fs from 'fs';

class RealtyService {
    async create(realty, images) {
        const imageNames = images.map(image => image.filename);
        return await Realty.create({ ...realty, images: imageNames });
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

    async update(id, realty, images) {
        if (!id) {
            throw new Error('wrong id');
        }

        const imageNames = images.map(image => image.filename);
        return await Realty.findByIdAndUpdate(
            id, {
                ...realty,
                $push: { images: { $each: imageNames }},
            },
            { new: true }
        );
    }

    async removeImage(id, image) {
        console.log('service', id, image);
        if (!id) {
            throw new Error('wrong id');
        }

        try {
            const res = await Realty.findByIdAndUpdate(
                id,
                {
                    $pull: { images: { $in: [image] }},
                },
                { new: true },
            );

            fs.unlink(`static/${image}`, () => console.log(`удалено ${image}`));

            return res;
        } catch (error) {
            console.log(error);
        }


    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        const realty = await Realty.findById(id);
        realty.images.forEach((image) => fs.unlink(`static/${image}`, () => console.log(`удалено ${image}`)));

        return await Realty.findByIdAndDelete(id);
    }

}

export default new RealtyService();
