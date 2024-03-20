import Realty from '../models/Realty.js';
import User from '../models/User.js';

class FavoriteService {
    async addFavorite(id, userId) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                {
                    $push: { favorites: [id] },
                },
                { new: true },
            );
        } catch (error) {
            console.error(error);
        }
    }

    async getFavorites(userId) {
        const user = await User.findById(userId);
        const favorites = await Realty.find({ _id: { $in: user.favorites } });

        return favorites;
    }

    async removeFavorite(id, userId) {
        if (!id || !userId) {
            throw new Error('wrong id');
        }

        try {
            return await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { favorites: id },
                },
                { new: true },
            );
        } catch (error) {
            console.error(error);
        }
    }
}

export default new FavoriteService();
