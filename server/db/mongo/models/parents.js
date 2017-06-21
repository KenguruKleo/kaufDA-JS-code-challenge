import mongoose from 'mongoose';

const ParentsSchema = new mongoose.Schema({
    contentType: String,
    id: { type: String, unique : true, required : true },
    properties: String,
    createdAt:  { type: Date, default: Date.now },
    offers: [
        new mongoose.Schema({
            id: {type: String, unique: true, required: true},
            properties: new mongoose.Schema({
                name: String,
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

ParentsSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        //ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

export default mongoose.model('Parents', ParentsSchema);