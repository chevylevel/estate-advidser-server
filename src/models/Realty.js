import { Schema, model } from 'mongoose';

const Realty = new Schema({
    name: { type: String, required: true },
    realtyType: { type: String },
    ownership: {type: String},
    ownershipPeriod: {type: String },
    squareMin: { type: String },
    squareMax:  { type: String },
    priceMin: { type: String },
    priceMax: { type: String },
    roiSale: { type: String },
    roiRent: { type: String },
    bedrooms: { type: String },
    landSquare: { type: String },
    location: { type: String },
    occupancy: { type: String },
    beachDistance:  { type: String },
    livingPossibility: { type: String },
    constructionStatus: { type: String },
    windowView: { type: String },
    description: { type: String },
    images: [{
        public_id: String,
        secure_url: String,
    }],
});

export default model('Realty', Realty);
