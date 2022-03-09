const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name :
    {
        type : String,
        required : [true,"İsim alanını kesinlikle girmelisiniz."],
        min : [3,"İsminiz minimum 3 karakter olmalı"],
        max : [25,"İsminiz max 15 karakter olmalı"]
    },
    email :
    {
        type : String,
        unique : true,
        required : [true,"Email hesabınızı girmelisiniz."],
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Lütfen geçerli bir email adresi giriniz."
        ]
    },
    role :
    {
        type : String,
        default : "user",
        enum : ["user","admin"]
    },
    password : 
    {
        type : String,
        required : [true,"Şifre alanını girmelisiniz."],
        min : [8,"Şifre en az 6 karakter olmalı"],
        max : [20,"Şifre en çok 20 karakter olmalı"],
        select : false
    },
    createdAt : 
    {
        type : Date,
        default : Date.now
    },
    isActive :
    {
        type : Boolean,
        default : true
    },
    about : 
    {
        type : String,
        min : [20,"Hakkında alanı en az 20 karakter olmalı"],
        max : [60,"Hakkında alanı en çok 60 karakter olmalı"]
    },
    isDeveloper : 
    {
        type : Boolean,
        default : false
    },
    profil_image : 
    {
        type : String,
        default :"default.img"
    },
    user_offer :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Offer'
        }
    ],
    accepted_offers :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Offer'
        }
    ]
    // iş teklifleri


},{collection:"Users",timestamps:true});

UserSchema.methods.getSignedToken = function()
{
    console.log("secret key : "+process.env.JWT_SECRET_KEY + " time "+process.env.JWT_EXPIRE);
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{expiresIn : process.env.JWT_EXPIRE});
}

// UserSchema.methods.matchPassword = async function(password)
// {
//     console.log("user pre"+this.password+"adwd"+password);
//     return await bcrypt.compare(password,this.password);
// }

// //HOOKS
// UserSchema.pre('save',async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })

module.exports = mongoose.model('User', UserSchema);
