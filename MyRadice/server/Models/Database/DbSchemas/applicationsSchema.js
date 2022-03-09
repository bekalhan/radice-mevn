const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./userSchema');
const Developer = require('./developerSchema');


const ApplicationsSchema = new mongoose.Schema({
    cv : 
    {
        type : String,
        required : [true,"Cv bölümünü doldurmalısınız."],
        min : [20,"Cv bölümü en az 20 karakter olmalı"],
        max : [100,"Cv bölümü en çok 100 karakter olmalı"]
    },
    developer : 
    [
    {
        type : Schema.Types.ObjectId,
        ref : 'Developer',
        required : true,
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
},{collection:"Applications",timestamps:true});

ApplicationsSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model('Applications', ApplicationsSchema);

