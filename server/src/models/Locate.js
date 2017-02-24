import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Locate = new Schema({
    loc: String,
    title: String,
    email: String,
    date: {type: Date, default: Date.now}
});

Locate.statics.create = function(loc, title, email){
    const locate = new this({
        loc,
        title,
        email
    });
    
    return locate.save();
};

export default mongoose.model('Locate', Locate);