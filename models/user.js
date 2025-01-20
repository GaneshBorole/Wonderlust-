const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
     
    },
    password:{
        type:String,
        
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
