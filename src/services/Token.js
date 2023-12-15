import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class TokenService {
    generateTokens(user) {
        const payload = { user };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        }
    }

    async updateRefreshToken(userId, refreshToken) {
        await User.findByIdAndUpdate(userId, { refreshToken });
    }
}

export default new TokenService();
