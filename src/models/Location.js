import { Schema, model } from 'mongoose';

const Location = new Schema({
    name: { type: String, required: true, unique: true },
});

export default model('Location', Location);
