import { Schema, model } from 'mongoose';

const Location = new Schema({
    name: { type: String, required: true },
});

export default model('Location', Location);
