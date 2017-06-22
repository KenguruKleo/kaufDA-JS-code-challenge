import mongoose from 'mongoose';

const OfferDetailsSchema = new mongoose.Schema({
    contentType: String,
    id: { type: String, unique : true, required : true },
    properties: String,
    createdAt:  { type: Date, default: Date.now },
    offer: [
        new mongoose.Schema({
            properties: new mongoose.Schema({
                name: String,
                category: String,
                description: String,
                productName: String,
                retailerUrl: String,
                productBrand: String,
                reducedPrice: new mongoose.Schema({
                    amount: {type: Number, min: 0},
                    currencyCode: String
                }),
                originalPrice: new mongoose.Schema({
                    amount: {type: Number, min: 0},
                    currencyCode: String
                }),
                productImagePointer: new mongoose.Schema({
                    itemName: String
                })
            }),
            createdAt:  { type: Date, default: Date.now }
        })
    ]
});

OfferDetailsSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        //ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

export default mongoose.model('OfferDetails', OfferDetailsSchema);