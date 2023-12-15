import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import User from '../models/User.js';
import UserDto from '../dtos/userDto.js';
import MailService from './Mail.js';
import tokenService from './Token.js';
import ApiError from '../exceptions/ApiError.js';

class AuthService {
    async signUp(email, password) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequestError('Пользователь с таким email уже зарегистрирован');
        }

        const hashedPassword = bcrypt.hashSync(password, 7);

        await MailService.sendActivationEmail(
            email,
            `${process.env.API_URL}/activate/${encodeURIComponent(hashedPassword)}`
        );

        const userModel = await User.create({
            email,
            password: hashedPassword,
            roles: ['user'],
        });

        const user = new UserDto(userModel);

        const {
            refreshToken,
            accessToken,
        } = tokenService.generateTokens({ ...user });

        await tokenService.updateRefreshToken(user.id, refreshToken);

        return {
            refreshToken,
            accessToken,
            user,
        };
    }

    async signIn(email, password) {
        const [
            userModel,
            isValidPassword,
        ] = await Promise.all(
            User.findOne({ email: email }),
            bcrypt.compare(password, userModel.password),
        );

        if (!userModel || !isValidPassword) {
            throw ApiError.BadRequestError('Неверное имя пользователя или пароль');
        }

        const user = {...new UserDto(userModel)};

        const {
            refreshToken,
            accessToken,
        } = tokenService.generateTokens(user);

        await tokenService.updateRefreshToken(user.id, refreshToken);

        return {
            refreshToken,
            accessToken,
            user,
        };
    }

    async signInWithGoogle(token) {
        const { email } = await this.verifyGoogleToken(token);

        let userModel = await User.findOne({ email: email });

        if (!userModel) {
            userModel = await (new User({ email })).save();
        }

        const user = { ...new UserDto(userModel) };

        const {
            refreshToken,
            accessToken,
        } = tokenService.generateTokens(user);

        await tokenService.updateRefreshToken(user.id, refreshToken);

        return {
            refreshToken,
            accessToken,
            user,
        }
    }

    async signOut(refreshToken) {
        if (!refreshToken) {
            return;
        }

        const { id } = jwt.decode(refreshToken);

        await tokenService.updateRefreshToken(id, '');
    }

    async activateAccount(key) {
        const userModel = await User.findOne({ password: key });

        if (!userModel) {
            throw ApiError.BadRequestError('Неверный ключ активации');
        }

        if (userModel.isActivated) {
            throw ApiError.BadRequestError('Подльзователь уже активирован');
        }

        await userModel.updateOne({ isActivated: true });
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const tokenPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userModel = await User.findOne({ refreshToken });

        if (!userModel || !tokenPayload) {

            console.log(userModel, tokenPayload);

            throw ApiError.UnauthorizedError();
        }

        const user = new UserDto(userModel);

        const {
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
        } = tokenService.generateTokens({ ...user });

        await tokenService.updateRefreshToken(user.id, newRefreshToken);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user,
        };
    }

    async getUsers() {
        return await User.find();
    }

    async verifyGoogleToken(token) {
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: token.token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        return ticket.getPayload();
    }
}

export default new AuthService();
