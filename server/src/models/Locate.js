import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Locate = new Schema({
    loc: String,
    title: String,
    email: String,
    date: {type: Date, default: Date.now}
});

export default mongoose.model('Locate', Locate);