const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');
const Application = require('./applicationsSchema');
const Features = require('./featuresSchema')


const DeveloperSchema = new mongoose.Schema({
    name:
    {
        type : String,
        required : true,
    },
    email :
    {
        type : String,
        required : true,
        unique : true
    },
    password : 
    {
        type : String,
        required : true,
    },
    secret_key : 
    {
        type : String,
        required : [true,"Özel kelime kesinlikle girmelisiniz"],
        min : [5,"Özel kelime en az  5 karakter olmalı"],
        max : [15,"Özel kelime en çok 15 karakter olmalı"]
    },
    information :
    {
        type : String,
        min : [20,"Bilgi alanı en az 20 karakter olmalı"],
        max : [50,"Bilgi alanı en çok 50 karakter olmalı"],
        default : "Ben radice'de bir developer olarak çalışmaktayım"
    },
    isBoss :
    {
        type : Boolean,
        default : false
    },
    isEmployee :
    {
        type : Boolean,
        default : false
    },
    profil_image : 
    {
        type : String,
        default : "default.img"
    },
    developerDate : 
    {
        type : Date,
        default : Date.now
    },
    contact_email :
    {
        type : String,
        default : "Henüz yok"
    },
    github :
    {
        type : String,
        default : "Henüz yok"
    },
    linkedln :
    {
        type : String,
        default : "Henüz yok"
    },
    twitter : 
    {
        type : String,
        default : "Henüz yok"
    },
    applications : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Applications"
        }
    ],
    myfeatures : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Features'
        }
    ],
    companies : 
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Company'
        }
    ],
    myworkplace : 
    [
        {
            type : mongoose.Schema.ObjectId,
            ref :  'Company'
        }
    ]

},{collection:"Developers",timestamps:true});

DeveloperSchema.plugin(require('mongoose-autopopulate'));

DeveloperSchema.methods.getSignedToken = function()
{
    console.log("secret key : "+process.env.JWT_SECRET_KEY + " time "+process.env.JWT_EXPIRE);
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{expiresIn : process.env.JWT_EXPIRE});
}

DeveloperSchema.methods.matchPassword = async function(password)
{
//   return  await bcrypt.compare(password,this.password);
}

// DeveloperSchema.pre('save',async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })

module.exports = mongoose.model('Developer', DeveloperSchema);

