import RealtyService from '../services/Realty.js';

class RealtyController {
    async create(ctx) {
        try {
            const createdRealty = await RealtyService.create(ctx.request.body);
            ctx.response.body = createdRealty;

        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async getAll(ctx) {
        try {
            const realties = await RealtyService.getAll()
            ctx.response.body = realties;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async getOne(ctx) {
        try {
            const { id } = ctx.params;
            const realty = await RealtyService.getOne(id);
            ctx.response.body = realty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async update(ctx) {
        try {
            const payload = ctx.request.body;
            const { id } = ctx.params;

            const updatedRealty = await RealtyService.update(id, payload);
            ctx.response.body = updatedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deletedRealty = await RealtyService.delete(id);
            ctx.response.body = deletedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    async removeImage(ctx) {
        try {
            const { realtyId, imageId } = ctx.params;
            const updatedRealty = await RealtyService.removeImage(realtyId, imageId);
            ctx.response.body = updatedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}

export default new RealtyController();
