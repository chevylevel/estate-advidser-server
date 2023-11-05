import RealtyService from './services/RealtyService.js';


class RealtyController {
    async create(ctx) {
        try {
            const createdRealty = await RealtyService.create(ctx.request.body, ctx.file);
            ctx.response.body = createdRealty;

        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }

    async getAll(ctx) {
        try {
            const realties = await RealtyService.getAll()
            ctx.response.body = realties;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }

    async getOne(ctx) {
        try {
            const { id } = ctx.params;
            const realty = await RealtyService.getOne(id);
            ctx.response.body = realty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }

    async update(ctx) {
        try {
            const realty = ctx.request.body;
            const { id } = ctx.params;

            console.log('=========update', id, realty, ctx.files);
            const updatedRealty = await RealtyService.update(id, realty, ctx.files);
            ctx.response.body = updatedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deletedRealty = await RealtyService.delete(id);
            ctx.response.body = deletedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }

    async removeImage(ctx) {
        try {
            const { id, imageId } = ctx.params;
            const updatedRealty = await RealtyService.removeImage(id, imageId);
            ctx.response.body = updatedRealty;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = error;
        }
    }
}

export default new RealtyController();
