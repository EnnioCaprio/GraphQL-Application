const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("This email hasn't a correct format");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("The password cannot contains the string 'password'")
            }
        }
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User