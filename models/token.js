import mongoose from 'mongoose';
import { model, Schema} from 'mongoose';

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
});

const tokenModel = mongoose.model('Token', TokenSchema);
export default tokenModel;