const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./userSchema');


const OfferSchema = new mongoose.Schema({
    job_defination :
    {
        type  : String,
        required :true
    },
    price :
    {
        type : String,
        required :true
    },
    user :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required :true,
            autopopulate : true
        }
    ],
    company :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Company',
            required : true
        }
    ]

},{collection:"Offers",timestamps:true});

OfferSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Offer', OfferSchema);

