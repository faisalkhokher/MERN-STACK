const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    tokens : [
        {
            token : {
                type: String,
                required: true
            },
        }
    ],
});

// hashing the password before saving
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10);
//         user.cpassword = await bcrypt.hash(user.password, 10);
//         next();
//     }
// });

// generating token
userSchema.methods.generateAuthToken = async function () {
    const userID = this._id;
    // Generate token 
    // @param unique ID of user
    // @return secret key
    const token = jwt.sign({'id':userID} , process.env.SECRET_KEY , {expiresIn : '2h'});
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
};

const User = mongoose.model('USER', userSchema);
module.exports = User;