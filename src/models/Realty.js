import { Schema, model } from 'mongoose';

const Realty = new Schema({
    name: { type: String, required: true },
    realtyType: { type: String, required: true },
    ownership: {type: String, required: true},
    ownershipPeriod: {type: String },
    squareMin: { type: String, required: true },
    squareMax:  { type: String, required: true },
    priceMin: { type: String, required: true },
    priceMax: { type: String, required: true },
    roiSale: { type: String, required: true },
    roiRent: { type: String, required: true },
    bedrooms: { type: String, required: true },
    landSquare: { type: String, required: true },
    location: { type: String, required: true },
    occupancy: { type: String, required: true },
    beachDistance:  { type: String, required: true },
    livingPossibility: { type: String, required: true },
    constructionStatus: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String] },
});

export default model('Realty', Realty);
