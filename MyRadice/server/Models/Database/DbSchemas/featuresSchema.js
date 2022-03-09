const mongoose = require('mongoose');
const {Schema} = mongoose;
const Developer = require('./developerSchema');


const FeaturesSchema = new mongoose.Schema({
    featurename : 
    {
        type : String,
        unique : true,
        required : true
    },
    featurerate :
    {
        type : String,
        required : true
    },
    developer :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Developer',
            required  : true,
            autopopulate : true
        }
    ] 
},{collection:"Features",timestamps:true});

FeaturesSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Features', FeaturesSchema);

