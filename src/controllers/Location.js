import LocationService from '../services/Location.js';

class LocationController {
    async create(ctx) {
        try {
            const locations = await LocationService.create(ctx.request.body);
            ctx.response.body = locations;

        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message }
        }
    }

    async getAll(ctx) {
        try {
            const locations = await LocationService.getAll()
            ctx.response.body = locations;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async update(ctx) {
        try {
            const location = ctx.request.body;
            const { id } = ctx.params;

            const locations = await LocationService.update(id, location);
            ctx.response.body = locations;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deletedLocation = await LocationService.delete(id);
            ctx.response.body = deletedLocation;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}

export default new LocationController();
