const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [
            true, "Please input your First Name"
        ],
        minLength : [3 , "Must be longer than 3 characters long"]
    },
    lastName: {
        type: String, 
        required: [
            true, "Please input your Last Name"
        ],
        minLength : [3 , "Must be longer than 3 characters long"]
    },
    userName: {
        type: String, 
        required: [
            true, "Please input a Username"
        ],
        minLength : [3 , "Must be longer than 3 characters long"]
    },
    email: {
        type: String, 
        unique: true,
        required: [
            true, "Please input an Email"
        ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
          }
    },
    password: {
        type: String, 
        required: [
            true, "Please input a secure password"
        ],
        minLength : [8 , "Must be longer than 8 characters long"]
    },
    about: {
        type: String,
        required : false
    }
}, {timestamps: true})
UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next()
      })
      .catch((err)=>{
        console.log("ERROR IN HASHING", err)
      })

  });
module.exports = mongoose.model('User', UserSchema);