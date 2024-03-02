import { Schema, model } from 'mongoose';

const Realty = new Schema({
    name: { type: String, required: true },
    realtyType: { type: String },
    ownership: { type: String },
    ownershipPeriod: { type: String },
    squareMin: { type: Number },
    squareMax: { type: Number },
    priceMin: { type: Number },
    priceMax: { type: Number },
    roiSale: { type: Number },
    roiRent: { type: Number },
    bedrooms: { type: Number },
    landSquareMin: { type: Number },
    landSquareMax: { type: Number },
    location: { type: String },
    occupancy: { type: Number },
    beachDistance: { type: Number },
    livingPossibility: { type: String },
    constructionStatus: { type: String },
    windowView: { type: String },
    description: { type: String },
    images: [{
        id: String,
        url: String,
    }],
});

export default model('Realty', Realty);
