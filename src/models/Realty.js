import { Schema, model } from 'mongoose';

const Realty = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    ownership: { type: String },
    ownershipPeriod: { type: Number },
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
    isPossibleToStay: { type: Boolean },
    constructionDeadlineYear: { type: Number },
    constructionDeadlineQuarter: { type: Number },
    description: { type: String },
    withView: { type: Boolean },
    withInstallment: { type: Boolean },
    tags:[String],
    images: [{
        id: String,
        url: String,
    }],
});

export default model('Realty', Realty);
