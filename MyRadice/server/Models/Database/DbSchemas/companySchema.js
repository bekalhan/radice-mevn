const mongoose = require('mongoose');
const {Schema} = mongoose;
const Developer = require('./developerSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CompanySchema = new mongoose.Schema({
    founder :
    {
        type : String,
        required : true
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
    company_name :
    {
        type :  String,
        required : [true,"Startup adı kesinlikle girilmelidir"],
        unique : true,
        min : [3,"Startup adı en az 3 karakter olmalıdır"],
        max : [15,"Startup adı en çok 15 karakter olmalıdır"]
    },
    developer : 
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Developer',
            required  : true,
            autopopulate : true
        }
    ] ,
    company_turnover : 
    {
        type : String,
        default : 0
    },
    success_rank :
    {
        type : String,
        default : 0
    },
    members : [
        {
            type :  mongoose.Schema.ObjectId,
            ref : 'Developer'
        }
    ],
    company_activeworks :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'CompanyWorks'
        }
    ],
    company_features :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'CompanyFeatures'
        }
    ],
    company_works:
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'CompanyWorks'
        }
    ],
    company_applications : 
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Applications'
        }
    ]

},{collection:"Companies",timestamps:true});

CompanySchema.plugin(require('mongoose-autopopulate'));

CompanySchema.methods.matchPassword = async function(password)
{
  return  await bcrypt.compare(password,this.password);
}

CompanySchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = mongoose.model('Company', CompanySchema);

