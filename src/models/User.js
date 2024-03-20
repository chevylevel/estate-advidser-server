import { Schema, model } from 'mongoose';

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    roles: [{ type: String, ref: 'Role', default: 'user' }],
    isActivated: { type: Boolean, default: false },
    refreshToken: { type: String },
    favorites: [String],
});

export default model('User', User);
