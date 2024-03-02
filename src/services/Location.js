import Location from '../models/Location.js';

class LocationService {
    async create(location) {
        return await Location.create(location);
    }

    async getAll() {
        return await Location.find();
    }

    async update(id, location) {
        if (!id) {
            throw new Error('wrong id');
        }

        return await Location.findByIdAndUpdate(
            id,
            location,
            { new: true },
        );
    }

    async delete(id) {
        if (!id) {
            throw new Error('wrong id');
        }

        try {
            return await Location.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new LocationService();
