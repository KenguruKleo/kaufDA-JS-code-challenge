import mongoose from 'mongoose';

const ParentsSchema = new mongoose.Schema({
    id: { type: String, unique : true, required : true },
    text: String
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