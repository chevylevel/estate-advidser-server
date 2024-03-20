import Location from '../models/Location.js';

class LocationService {
    async create(location) {
        await Location.create(location);

        return this.getAll();
    }

    async getAll() {
        return await Location.find();
    }

    async update(id, location) {
        if (!id) {
            throw new Error('wrong id');
        }

        await Location.findByIdAndUpdate(
            id,
            location,
            { new: true },
        );

        return this.getAll()
    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        try {
            await Location.findByIdAndDelete(id);

            return this.getAll()
        } catch (error) {
            console.error(error);
        }
    }
}

export default new LocationService();
