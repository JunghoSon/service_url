import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    emailId: String,
    create: {type: Date, default: Date.now}
});

User.statics.create = function(emailId){
    const user = new this({
        emailId
    });
    
    return user.save();
};

User.statics.findOneByEmail = function(emailId){    
    return this.findOne({
        emailId
    }).exec();
};

export default mongoose.model('User', User);